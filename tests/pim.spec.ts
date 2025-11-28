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
        const pimPage = new PimPage(page)

        const employee = employeeFactory.employee("Gustavo", "Carneiro", "Quinto")

        await pimPage.addEmployee(employee)

        await expect(page.getByText('Success', {exact: true})).toBeVisible();

        await expect(page.getByText('Successfully Saved', {exact: true})).toBeVisible();

    });
});