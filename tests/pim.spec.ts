import { test, expect } from '../fixtures/login_fixture';
import { PimPage } from '../pages/pim_page';
import { Toast } from '../pages/toasts_page';
import { EmployeeFactory } from '../factories/employee_factory'


test.describe('PIM', () => {
    const employeeFactory = new EmployeeFactory();
    
    test.beforeEach(async ({page, adminLogin}) => {
        const pimPage = new PimPage(page);

        await pimPage.accessPimPage();
    })

    test('CT-PIM-001 - Cadastro e listagem de Funcionários', async ({page}) => {
        let employees = [];
        const pimPage = new PimPage(page)
        const toastPage = new Toast(page)

        //Criar 3 Employees
        for(let i = 0; i < 3; i++){
            const employee = employeeFactory.employee("Funcionario", "teste", i.toString())
            employees.push(employee);

            await pimPage.addEmployee(employee)

            // Mensagens de Sucesso
            const toast = await toastPage.getSuccessToast();
            await expect(toast.message).toContain('Successfully Saved')

            // Valores preenchidos corretamente no detalhamento de Employee recém cadastrado
            await expect(pimPage.firstNameInput).toHaveValue(employee.firstName);
            await expect(pimPage.middleNameInput).toHaveValue(employee.middleName);
            await expect(pimPage.lastNameInput).toHaveValue(employee.lastName);
        }

        //Acesso a listagem de Employee
        await pimPage.accessEmployeeList();

        //Consulto employee utilizando filtragem por Id recém criado
        for (const employee of employees){
            
            await pimPage.findEmployeeById(employee.id.toString());

            //Employee aparece na lista com os valores previamente cadastrados
            const employeefirstMiddleName = `${employee.firstName} ${employee.middleName}`

            await expect(page.getByRole('cell', { name: employee.id.toString(), exact: true })).toBeVisible();
            await expect(page.getByRole('cell', { name: employeefirstMiddleName, exact: true })).toBeVisible();
            await expect(page.getByRole('cell', { name: employee.lastName, exact: true})).toBeVisible();
        }
    });

    test('CT-PIM-002 - Remover dois funcionários', async ({page}) =>{
        const pimPage = new PimPage(page);
        const toastPage = new Toast(page);

        for (let i = 0; i < 2; i++){
            //Acesso listagem  de Employee
            await pimPage.accessEmployeeList();

            //Deleto um usuário e salvo seu ID para consulta posterior via filtros
            const deletedEmployeeId = await pimPage.deleteEmployee();

            //Consulto toast de sucesso
            const successToast = await toastPage.getSuccessToast();
            await expect(successToast.message).toContain('Successfully Deleted')

            //Busco Employee utilizando filtro por Employee ID
            await page.waitForSelector('.oxd-toast', { state: 'detached' });
            await pimPage.findEmployeeById(deletedEmployeeId);

            //Confirmo toast de registro não encontrado (pois foi deletado)
            const infoToast = await toastPage.getInfoToast()
            await expect(infoToast.message).toContain('No Records Found')

            //Garanto que não existe elementos na lista
            await expect((await pimPage.tableRows())).toHaveCount(0)
            await page.waitForSelector('.oxd-toast', { state: 'detached' });
             
        }
    })

    test('CT-PIM-003 - Editar um funcionário', async({page}) => {
        const pimPage = new PimPage(page);
        const toasts = new Toast(page);

        //Crio um novo objeto de funcionário
        const employee = new EmployeeFactory().employee("Usuario edit", 'test', 'Editado')

        //Edito e salvo um funcionario aplicando os dados recém gerados
        await pimPage.editEmployee(employee)

        //Confirmo que ha feedback de sucesso para o usuário
        const successToast = await toasts.getSuccessToast();
        await expect(successToast.message).toContain('Successfully Updated')

        //Atualizo a pagina atual de edição, para garantir que os dados persistem após salvar
        await page.reload();

        const savedEditionSuccessFully = await pimPage.isEmployeeEditedSuccesfully(employee)
        await expect(savedEditionSuccessFully).toBeTruthy();
    })

});