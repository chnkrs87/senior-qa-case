import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ScreenshotHelper } from '../utils/ScreenshotHelper';
import { CONFIG } from '../config/constants';

test.describe('SauceDemo Senior QA Suite', () => {
    let loginPage: LoginPage;
    let productPage: ProductPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        checkoutPage = new CheckoutPage(page);
        await loginPage.navigate();
    });

    test('Senaryo 1: Başarılı Login', async ({ page }) => {
        await loginPage.login(CONFIG.USERS.STANDARD, CONFIG.USERS.PASSWORD);
        await ScreenshotHelper.takeStepScreenshot(page, '1-Giris-Basarili');
        await expect(page).toHaveURL(/inventory.html/);
        await ScreenshotHelper.takeStepScreenshot(page, '2-Urunler-Listelendi');
    });

    test('Senaryo 2: Hatalı Login', async ({ page }) => {
        await loginPage.login(CONFIG.USERS.LOCKED, CONFIG.USERS.PASSWORD);
        await ScreenshotHelper.takeStepScreenshot(page, '1-Hatali-Giris-Denemesi');
        await expect(loginPage.errorMessage).toBeVisible();
        await ScreenshotHelper.takeStepScreenshot(page, '2-Hata-Mesaji-Dogrulandi');
    });

    test('Senaryo 3: Ürün Sepete Ekleme', async ({ page }) => {
        await loginPage.login(CONFIG.USERS.STANDARD, CONFIG.USERS.PASSWORD);
        await productPage.addToCart(0);
        await ScreenshotHelper.takeStepScreenshot(page, '1-Ilk-Urun-Sepette');
        await productPage.addToCart(1);
        await ScreenshotHelper.takeStepScreenshot(page, '2-Ikinci-Urun-Sepette');
        await expect(productPage.shoppingCartBadge).toHaveText('2');
    });

    test('Senaryo 4: Sepetten Ürün Çıkarma', async ({ page }) => {
        await loginPage.login(CONFIG.USERS.STANDARD, CONFIG.USERS.PASSWORD);
        await productPage.addToCart(0);
        await ScreenshotHelper.takeStepScreenshot(page, '1-Urun-Eklendi');
        await productPage.removeFromCart(0);
        await ScreenshotHelper.takeStepScreenshot(page, '2-Urun-Cikarildi');
        await expect(productPage.shoppingCartBadge).not.toBeVisible();
    });

    test('Senaryo 5: Ürün Sıralama (Price Low to High)', async ({ page }) => {
        await loginPage.login(CONFIG.USERS.STANDARD, CONFIG.USERS.PASSWORD);
        await productPage.sortByPriceLowToHigh();
        await ScreenshotHelper.takeStepScreenshot(page, '1-Siralama-Degistirildi');
        const prices = await productPage.getPrices();
        expect(prices).toEqual([...prices].sort((a, b) => a - b));
        await ScreenshotHelper.takeStepScreenshot(page, '2-Siralama-Dogrulandi');
    });

    test('Senaryo 6: Başarılı Checkout', async ({ page }) => {
        await loginPage.login(CONFIG.USERS.STANDARD, CONFIG.USERS.PASSWORD);
        await productPage.addToCart(0);
        await ScreenshotHelper.takeStepScreenshot(page, '1-Urun-Eklendi');
        
        await page.goto('https://www.saucedemo.com/checkout-step-one.html');
        await ScreenshotHelper.takeStepScreenshot(page, '2-Checkout-Formu');
        
        await checkoutPage.fillInformation('Senior', 'QA', '34000');
        await ScreenshotHelper.takeStepScreenshot(page, '3-Bilgiler-Dolduruldu');
        
        await page.click('[data-test="continue"]');
        await ScreenshotHelper.takeStepScreenshot(page, '4-Checkout-Ozet');
        
        await page.click('[data-test="finish"]');
        await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
        await ScreenshotHelper.takeStepScreenshot(page, '5-Siparis-Tamamlandi');
    });

    test('Senaryo 7: Checkout - Zorunlu Alan Kontrolü', async ({ page }) => {
        await loginPage.login(CONFIG.USERS.STANDARD, CONFIG.USERS.PASSWORD);
        await page.goto('https://www.saucedemo.com/checkout-step-one.html');
        await ScreenshotHelper.takeStepScreenshot(page, '1-Bos-Form');
        
        await checkoutPage.fillInformation('', 'QA', '12345'); // İsim boş
        await page.click('[data-test="continue"]');
        await ScreenshotHelper.takeStepScreenshot(page, '2-Eksik-Giris-Hatasi');
        await expect(checkoutPage.errorMessage).toContainText('First Name is required');
    });

    test('Senaryo 8: Logout İşlemi', async ({ page }) => {
        await loginPage.login(CONFIG.USERS.STANDARD, CONFIG.USERS.PASSWORD);
        await ScreenshotHelper.takeStepScreenshot(page, '1-Ana-Sayfa');
        await productPage.logout();
        await ScreenshotHelper.takeStepScreenshot(page, '2-Logout-Sonrasi');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

    test('Senaryo 9: Ürün Detay Sayfası', async ({ page }) => {
        await loginPage.login(CONFIG.USERS.STANDARD, CONFIG.USERS.PASSWORD);
        await productPage.openProductDetails(0);
        await ScreenshotHelper.takeStepScreenshot(page, '1-Urun-Detay-Sayfasi');
        await expect(page.locator('.inventory_details_name')).toBeVisible();
    });

    test('Senaryo 10: Cross-browser / Smoke Test', async ({ page }) => {
        await loginPage.login(CONFIG.USERS.STANDARD, CONFIG.USERS.PASSWORD);
        await ScreenshotHelper.takeStepScreenshot(page, '1-Login-Smoke-Check');
        await expect(page.locator('.title')).toHaveText('Products');
    });
});