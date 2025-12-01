import { Page, Locator } from '@playwright/test';
import dotenv from 'dotenv';

export class AccessPage{
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;

    constructor(page: Page) {
        this.page = page;
        dotenv.config();
        this.usernameInput = this.page.getByPlaceholder("Username");
        this.passwordInput = this.page.getByPlaceholder("Password");
    }

    async accessPage(){
        await this.page.goto(process.env.TEST_BASE_URL!);
    }

    async login(username: string, senha: string){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(senha);

        await this.page.getByRole('button', {name: 'Login'}).click()
    }

    async isDashboardPage(): Promise<Boolean> {

        const h6Element = await this.page.getByRole("heading", {level: 6, name: "Dashboard"})

        if (await h6Element.innerHTML() == 'Dashboard'){
            return true
        }
        return false
        
    }

}