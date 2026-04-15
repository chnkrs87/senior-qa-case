import { Page, Locator } from '@playwright/test';
import { ScreenshotHelper } from '../utils/ScreenshotHelper';

export class ProductPage {
    readonly page: Page;
    readonly inventoryItems: Locator;
    readonly shoppingCartBadge: Locator;
    readonly sortContainer: Locator;
    readonly menuButton: Locator;
    readonly logoutLink: Locator;
    readonly productName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItems = page.locator('.inventory_item');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.sortContainer = page.locator('[data-test="product-sort-container"]');
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.logoutLink = page.locator('#logout_sidebar_link');
        this.productName = page.locator('.inventory_item_name');
    }

    async addToCart(index: number = 0) {
        const item = this.inventoryItems.nth(index).locator('button');
        await item.click();
        await ScreenshotHelper.takeStepScreenshot(this.page, `Urun-Sepete-Eklendi-Index-${index}`);
    }

    async removeFromCart(index: number = 0) {
        await this.inventoryItems.nth(index).locator('button').click();
        await ScreenshotHelper.takeStepScreenshot(this.page, `Urun-Sepetten-Cikarildi`);
    }

    async sortByPriceLowToHigh() {
        await this.sortContainer.selectOption('lohi');
        await ScreenshotHelper.takeStepScreenshot(this.page, 'Urunler-Fiyata-Gore-Siralandi');
    }

    async getPrices(): Promise<number[]> {
        const prices = await this.page.locator('.inventory_item_price').allInnerTexts();
        return prices.map(p => parseFloat(p.replace('$', '')));
    }

    async openProductDetails(index: number = 0) {
        await this.productName.nth(index).click();
        await ScreenshotHelper.takeStepScreenshot(this.page, 'Urun-Detay-Sayfasi-Acildi');
    }

   async logout() {
        await this.menuButton.click();
        await this.logoutLink.waitFor({ state: 'visible' });
        await ScreenshotHelper.takeStepScreenshot(this.page, 'Yan-Menu-Acildi');
        
        await this.logoutLink.click();
        await ScreenshotHelper.takeStepScreenshot(this.page, 'Cikis-Yapildi-Login-Sayfasi');
    }
}