import { test, expect } from '../fixtures/login_fixture';
import { PimPage } from '../pages/pim_page';
import { EmployeeFactory } from '../factories/employee_factory'

test.describe('PIM', () => {
    const employeeFactory = new EmployeeFactory();
    
    test.beforeEach(async ({page, adminLogin}) => {
        const pimPage = new PimPage(page);

        await pimPage.accessPimPage();
    })

    test('CT-PIM-001 - Criar colaborador', async ({page}) => {

        for(let i = 0; i < 3; i++){
            const pimPage = new PimPage(page)

            const employee = employeeFactory.employee("Funcionario", "teste", i.toString())

            await pimPage.addEmployee(employee)

            // Mensagens de Sucesso
            await expect(page.getByText('Success', {exact: true})).toBeVisible();
            await expect(page.getByText('Successfully Saved', {exact: true})).toBeVisible();

            // Valores preenchidos corretamente no detalhamento de Employee recém cadastrado
            await expect(pimPage.firstNameInput).toHaveValue(employee.firstName);
            await expect(pimPage.middleNameInput).toHaveValue(employee.middleName);
            await expect(pimPage.lastNameInput).toHaveValue(employee.lastName);
        }
    });

    test('CT-PIM-002 - Validar lista de funcionários', async ({page}) => {
        
    })


});