import { Locator, Page, expect } from "@playwright/test";
import { randomInt } from "crypto";
import { Employee } from "../models/employee_model";

export class PimPage {
    
    public page: Page;
    readonly addButton: Locator;
    readonly firstNameInput: Locator;
    readonly middleNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly employeeIdInput: Locator;
    readonly addEmployeeSaveButton: Locator; 
    readonly pimLinkButton: Locator;

    constructor(page: Page){
        this.page = page;

        this.addButton = this.page.getByRole('button', {name: 'Add'});
        this.firstNameInput = this.page.getByPlaceholder("First Name");
        this.middleNameInput = this.page.getByPlaceholder("Middle Name");
        this.lastNameInput = this.page.getByPlaceholder("Last Name");
        this.employeeIdInput = this.page.locator('.oxd-input-group:has(label:has-text("Employee Id")) input');
        this.addEmployeeSaveButton = this.page.getByRole('button', {name: 'save'});
        this.pimLinkButton = this.page.getByRole('link', { name: 'PIM' });
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
}