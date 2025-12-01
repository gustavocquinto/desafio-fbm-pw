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

        await pimPage.accessEmployeeList();

        for (let i = 0; i < 1; i++){
             const deletedEmployeeId = await pimPage.deleteEmployee();

             const successToast = await toastPage.getSuccessToast();
             await expect(successToast.message).toContain('Successfully Deleted')

             await page.waitForSelector('.oxd-toast', { state: 'detached' });
             await pimPage.findEmployeeById(deletedEmployeeId);

             const infoToast = await toastPage.getInfoToast()
             await expect(infoToast.message).toContain('No Records Found')
             await expect((await pimPage.tableRows())).toHaveCount(0)
             await page.waitForSelector('.oxd-toast', { state: 'detached' });
             
        }
    })

});