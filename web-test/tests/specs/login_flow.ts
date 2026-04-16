// @ts-nocheck
import { browser, $, expect } from '@wdio/globals';
import allure from '@wdio/allure-reporter';

describe('OrangeHRM End-to-End Login Flow', () => {

    it('Should login and redirect to dashboard URL', async () => {
        allure.addFeature('Authentication');
        allure.addSeverity('blocker');

        await browser.url('/web/index.php/auth/login');
        
        const usernameInput = await $('input[name="username"]');
        await usernameInput.waitForDisplayed({ timeout: 45000 });

        await usernameInput.setValue('Admin');
        await $('input[name="password"]').setValue('admin123');
        await $('button[type="submit"]').click();

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('dashboard/index'),
            { timeout: 30000, timeoutMsg: 'Dashboard URL yüklenemedi' }
        );

        const dashboardHeader = await $('.oxd-topbar-header-breadcrumb-module');
        await dashboardHeader.waitForDisplayed({ 
            timeout: 20000, 
            timeoutMsg: 'Dashboard yazisi ekrana gelmedi!' 
        });

        expect(await dashboardHeader.getText()).toBe('Dashboard');

        await browser.pause(2000);

        const screenshot = await browser.takeScreenshot();
        allure.addAttachment(
            'Login Başarili - Dashboard Kaniti', 
            Buffer.from(screenshot, 'base64'), 
            'image/png'
        );

        expect(await browser.getUrl()).toContain('dashboard/index');
    });    
});