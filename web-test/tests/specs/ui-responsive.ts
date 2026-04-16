import { browser, $, expect } from '@wdio/globals';
import allure from '@wdio/allure-reporter';

describe('OrangeHRM UI & Responsive Verification', () => {
    const viewports = [
        { name: 'Desktop_FHD', width: 1920, height: 1080 },
        { name: 'Laptop', width: 1366, height: 768 },
        { name: 'Tablet', width: 768, height: 1024 },
        { name: 'Mobile', width: 375, height: 667 }
    ];

    viewports.forEach(viewport => {
        it(`Should verify UI layout on ${viewport.name}`, async () => {
            allure.addFeature('Responsive UI');
            allure.addStep(`${viewport.name} çözünürlüğü ayarlaniyor: ${viewport.width}x${viewport.height}`);
            await browser.setWindowSize(viewport.width, viewport.height);

            allure.addStep('Sayfa yükleniyor');
            await browser.url('/web/index.php/auth/login');
            
            const loginBox = await $('.orangehrm-login-slot');
            await loginBox.waitForDisplayed({ timeout: 15000 });

            allure.addStep('Ekran görüntüsü kaydediliyor');
            await browser.saveScreenshot(`./reports/UI_${viewport.name}.png`);
            
            expect(await loginBox.isDisplayed()).toBe(true);
        });
    });
});