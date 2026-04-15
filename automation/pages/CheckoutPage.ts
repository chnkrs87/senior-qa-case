import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly zipCode: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.zipCode = page.locator('[data-test="postalCode"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async fillInformation(fName: string, lName: string, zip: string) {
        if(fName) await this.firstName.fill(fName);
        if(lName) await this.lastName.fill(lName);
        if(zip) await this.zipCode.fill(zip);
    }
}