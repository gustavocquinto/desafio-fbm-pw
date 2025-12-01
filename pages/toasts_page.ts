import { Page } from '@playwright/test';

export class Toast {
    constructor(private page: Page) {}

    async getSuccessToast() {
        const toast = this.page.locator('.oxd-toast--success');

        await toast.waitFor({ state: 'visible' });

        const title = await toast.locator('.oxd-toast-title, .oxd-text--toast-title').innerText();
        const message = await toast.locator('.oxd-toast-message, .oxd-text--toast-message').innerText();

        return { title, message };
    }

    async getInfoToast() {
        const toast = this.page.locator('.oxd-toast--info');

        await toast.waitFor({ state: 'visible' });

        const title = await toast.locator('.oxd-toast-title, .oxd-text--toast-title').innerText();
        const message = await toast.locator('.oxd-toast-message, .oxd-text--toast-message').innerText();

        return { title, message };
    }
}