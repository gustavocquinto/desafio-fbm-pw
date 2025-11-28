import { expect } from '@playwright/test';
import { test } from '../fixtures/login_fixture';
import {LoginPage} from '../pages/access_page';


test.describe('Login', () => {

    test('CT-LOGIN-001 - Campo User obrigatório', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login("", "123");

        await expect(page.getByText('Required')).toBeVisible();

    });

    test('CT-LOGIN-002 - Campo Password obrigatório', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login("Admin", "");

        await expect(page.getByText('Required')).toBeVisible();

    });

    test('CT-LOGIN-003 - Credenciais inválidas', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login("LoginInvalido", "SenhaIncorreta");

        await expect(page.getByText('Invalid credentials')).toBeVisible();

    });

    test('CT-LOGIN-004 - Com Sucesso', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login(process.env.TEST_USER_LOGIN!, process.env.TEST_USER_PASSWORD!);

        await expect(page).toHaveURL(/.*dashboard\/index/);

    });

});



    

