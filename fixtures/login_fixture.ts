import {baseTest as base, expect} from './base_fixture';
import { LoginPage } from '../pages/access_page';

type LoginFixtures = {
    adminLogin: void;
    commonLogin: void;
};

export const test = base.extend<LoginFixtures>({
    adminLogin: async ({page}, use) => {
       const loginPage = new LoginPage(page);
       await loginPage.login(process.env.TEST_USER_LOGIN!, process.env.TEST_USER_PASSWORD!)
       await use();
    },
})

export { expect } from '@playwright/test';