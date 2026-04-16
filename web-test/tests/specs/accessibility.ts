// @ts-nocheck
import AxeBuilder from '@axe-core/webdriverio';
import { expect, browser, $ } from '@wdio/globals';
import allure from '@wdio/allure-reporter';

describe('OrangeHRM Accessibility Deep Audit', () => {
    
    it('Should perform a deep scan for WCAG 2.1 AA', async () => {
        allure.addFeature('Accessibility Audit');
        allure.addDescription('OrangeHRM Login sayfasinin WCAG 2.1 AA standartlarina göre derinlemesine taranmasi.');
        allure.addSeverity('critical');

        await browser.url('/web/index.php/auth/login');
        
        const loginBtn = await $('button[type="submit"]');
        await loginBtn.waitForDisplayed({ timeout: 30000 });
        await browser.pause(3000); 

        const results = await new AxeBuilder({ client: browser })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
            .analyze();

        console.log(`--- Toplam İhlal Sayisi: ${results.violations.length} ---`);

        if (results.violations.length > 0) {
            results.violations.forEach((violation, index) => {
                const stepTitle = `İhlal #${index + 1}: ${violation.id} (${violation.impact})`;
                
                allure.addStep(stepTitle, {
                    content: `Kural Tanimi: ${violation.description}\n\n` +
                             `Etki Seviyesi: ${violation.impact}\n\n` +
                             `Çözüm Önerisi: ${violation.help}\n\n` +
                             `Belgeler: ${violation.helpUrl}`,
                    name: 'Hata Detaylari'
                }, 'text/plain');
                
                allure.addAttachment(
                    `Hata #${index + 1} Teknik Veri`, 
                    JSON.stringify(violation.nodes, null, 2), 
                    'application/json'
                );
            });
        }

        const screenshot = await browser.takeScreenshot();
        allure.addAttachment('Erişilebilirlik Tarama Ani', Buffer.from(screenshot, 'base64'), 'image/png');

   
        expect(results.violations.length).toBe(0);
    });
});