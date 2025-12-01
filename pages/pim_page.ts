import { Locator, Page, expect } from "@playwright/test";
import { randomInt } from "crypto";
import { Employee } from "../models/employee_model";
import { EmployeeFactory } from "../factories/employee_factory";


export class PimPage {
    
    public page: Page;
    readonly addButton: Locator;
    readonly firstNameInput: Locator;
    readonly middleNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly employeeIdInput: Locator;
    readonly addEmployeeSaveButton: Locator; 
    readonly pimLinkButton: Locator;
    readonly employeeListButton: Locator;
    readonly searchByFilterButton: Locator;
    readonly employeeNameInput: Locator;

    constructor(page: Page){
        this.page = page;

        this.addButton = this.page.getByRole('link', {name: 'Add Employee'});
        this.firstNameInput = this.page.getByPlaceholder("First Name");
        this.middleNameInput = this.page.getByPlaceholder("Middle Name");
        this.lastNameInput = this.page.getByPlaceholder("Last Name");
        this.employeeIdInput = this.page.locator('.oxd-input-group:has(label:has-text("Employee Id")) input');
        this.addEmployeeSaveButton = this.page.getByRole('button', {name: 'save'});
        this.pimLinkButton = this.page.getByRole('link', { name: 'PIM' });
        this.employeeListButton = this.page.getByRole('link', { name: 'Employee List'});
        this.searchByFilterButton = this.page.getByRole('button', {name: 'Search'});
        this.employeeNameInput = this.page.locator('.oxd-input-group:has(label:has-text("Employee Name")) input');
    }

    async accessPimPage(){
        await this.pimLinkButton.click();
    }

    async addEmployee(employee: Employee){
        await this.addButton.click();
        await this.firstNameInput.fill(employee.firstName);
        await this.middleNameInput.fill(employee.middleName);
        await this.lastNameInput.fill(employee.lastName);
        await this.employeeIdInput.fill(employee.id.toString());
        await this.addEmployeeSaveButton.click();
    }

    async accessEmployeeList(){
        await this.employeeListButton.click();
    }

    async findEmployeeByFilter(filterLabel: string, value: string){

        switch(filterLabel){
            case 'Employee Id':
                await this.employeeIdInput.fill(value)
            case 'Employee Name':
                await this.employeeNameInput.fill(value)
        }

        await this.searchByFilterButton.click();
    }
    
    async findEmployeeById(employeeId: String){
        await this.employeeIdInput.fill(employeeId.toString())
        await this.searchByFilterButton.click();
        await this.page.waitForTimeout(2500);
    }

    async deleteEmployee(): Promise<String>{
        let employeeId = '';
        await this.page.waitForTimeout(2500);

        // pego linha da tabela
        const rows = await this.page.locator('.oxd-table-card').all();
        const secondRow = rows[1];
        const cells = await secondRow.locator('[role="cell"]');

        // capturo o ID do funcionário
        employeeId = await cells.nth(1).innerText();
        console.log("Número do employee: " + employeeId.toString());

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

}