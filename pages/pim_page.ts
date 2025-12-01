import { Locator, Page } from "@playwright/test";
import { Employee } from "../models/employee_model";


export class PimPage {
    
    public page: Page;
    readonly addButton: Locator;
    readonly firstNameInput: Locator;
    readonly middleNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly employeeIdInput: Locator;
    readonly saveButton: Locator; 
    readonly pimLinkButton: Locator;
    readonly employeeListButton: Locator;
    readonly searchByFilterButton: Locator;
    readonly employeeNameInput: Locator;
    readonly employeeMaleGenderCheckbox: Locator;
    readonly employeeFemaleGenderCheckbox: Locator;

    constructor(page: Page){
        this.page = page;

        this.addButton = this.page.getByRole('link', {name: 'Add Employee'});
        this.firstNameInput = this.page.getByPlaceholder("First Name");
        this.middleNameInput = this.page.getByPlaceholder("Middle Name");
        this.lastNameInput = this.page.getByPlaceholder("Last Name");
        this.employeeIdInput = this.page.locator('.oxd-input-group:has(label:has-text("Employee Id")) input');
        this.saveButton = this.page.getByRole('button', {name: 'save'});
        this.pimLinkButton = this.page.getByRole('link', { name: 'PIM' });
        this.employeeListButton = this.page.getByRole('link', { name: 'Employee List'});
        this.searchByFilterButton = this.page.getByRole('button', {name: 'Search'});
        this.employeeNameInput = this.page.locator('.oxd-input-group:has(label:has-text("Employee Name")) input');
        this.employeeMaleGenderCheckbox = this.page.locator('//input[@value="1"]')
        this.employeeFemaleGenderCheckbox = this.page.locator('//input[@value="2"]')
    }

    async accessPimPage(): Promise<void>{
        await this.pimLinkButton.click();
    }

    async addEmployee(employee: Employee): Promise<void>{
        await this.addButton.click();
        await this.firstNameInput.fill(employee.firstName);
        await this.middleNameInput.fill(employee.middleName);
        await this.lastNameInput.fill(employee.lastName);
        await this.employeeIdInput.fill(employee.id.toString());
        await this.saveButton.click();
    }

    async accessEmployeeList(): Promise<void>{
        await this.employeeListButton.click();
    }

    async findEmployeeByFilter(filterLabel: string, value: string): Promise<void>{

        switch(filterLabel){
            case 'Employee Id':
                await this.employeeIdInput.fill(value)
                break;
            case 'Employee Name':
                await this.employeeNameInput.fill(value)
                break;
            default:
                throw new Error(`Filtro inválido: ${filterLabel}`);
        }

        await this.searchByFilterButton.click();
    }
    
    async findEmployeeById(employeeId: String): Promise<void>{
        await this.employeeIdInput.fill(employeeId.toString())
        await this.searchByFilterButton.click();
        await this.waitSpinnerLoad()
    }

    async deleteEmployee(): Promise<String>{
        let employeeId = '';
        await this.waitSpinnerLoad()

        // pego linha da tabela
        const rows = await this.page.locator('.oxd-table-card').all();
        const secondRow = rows[12];
        const cells = await secondRow.locator('[role="cell"]');

        // capturo o ID do funcionário
        employeeId = await cells.nth(1).innerText();

        const deleteButton = await secondRow.locator('.oxd-table-cell-actions button').nth(1);
        await deleteButton.click();

        // confirmo a exclusão no modal
        const confirmBtn = await this.page.getByRole('button', { name: 'Yes, Delete' });
        if (await confirmBtn.isVisible()) {
            await confirmBtn.click();
        }

        //retorno o id do employee excluído
        return employeeId;
    }

    async tableRows(){
        return await this.page.locator('.oxd-table-card');
    }

    async editEmployee(employee: Employee): Promise<void>{
        let employeeId = '';
        await this.waitSpinnerLoad()

        const rows = await this.page.locator('.oxd-table-card').all();
        const secondRow = rows[12];
        const cells = await secondRow.locator('[role="cell"]');

        employeeId = await cells.nth(1).innerText();

        const editButton = await secondRow.locator('.oxd-table-cell-actions button').nth(0);
        await editButton.click();

        await this.waitSpinnerLoad()

        await this.firstNameInput.fill(employee.firstName);

        await this.employeeIdInput.fill(employee.id.toString())

        await this.lastNameInput.fill(employee.lastName);

        await this.employeeFemaleGenderCheckbox.click({force: true})

        await this.saveButton.first().click();
    }

    async waitSpinnerLoad(): Promise<void>{
        await this.page.waitForTimeout(600);
        await this.page.waitForSelector('.oxd-loading-spinner', {state: 'detached'})
    }

    async isEmployeeEditedSuccesfully(employee: Employee): Promise<boolean>{
        await this.waitSpinnerLoad()
        const firstNameInputValue = await this.firstNameInput.inputValue()
        const lastNameInputValue = await this.lastNameInput.inputValue()

        if (firstNameInputValue == employee.firstName && lastNameInputValue == employee.lastName && await this.employeeFemaleGenderCheckbox.isChecked()){
            return true
        }
        return false
    }

}