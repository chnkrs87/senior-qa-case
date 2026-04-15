import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CONFIG } from '../config/constants';
import { ScreenshotHelper } from '../utils/ScreenshotHelper';

test.describe('Kimlik Doğrulama Testleri', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
        await ScreenshotHelper.takeStepScreenshot(page, '0-Login-Sayfasi-Yuklendi');
    });

    test('Senaryo 1: Başarılı Login', async ({ page }) => {
        await loginPage.login(CONFIG.USERS.STANDARD, CONFIG.USERS.PASSWORD);
        await ScreenshotHelper.takeStepScreenshot(page, '1-Giris-Bilgileri-Gonderildi');
        
        await expect(page).toHaveURL(/inventory.html/);
        await expect(page.locator('.title')).toHaveText('Products');
        await ScreenshotHelper.takeStepScreenshot(page, '2-Basarili-Giris-Dogrulandi');
    });

    test('Senaryo 2: Hatalı Login', async ({ page }) => { 
        await loginPage.login(CONFIG.USERS.LOCKED, CONFIG.USERS.PASSWORD);
        await ScreenshotHelper.takeStepScreenshot(page, '1-Locked-User-Denemesi');
        
        await expect(loginPage.errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
        await ScreenshotHelper.takeStepScreenshot(page, '2-Hata-Mesaji-Goruntulendi');
    });
});