/// <reference types="node" />
import { Page, test } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

export class ScreenshotHelper {
    static async takeStepScreenshot(page: Page, stepName: string) {
        try {
            const browserName = test.info().project.name;
            const testTitle = test.info().title.replace(/[^a-z0-9]/gi, '-').toLowerCase();
            
            const folderPath = path.resolve(process.cwd(), 'test-results', browserName, testTitle);
            
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath, { recursive: true });
            }

            const timestamp = Date.now();
            const fileName = `${stepName.replace(/[^a-z0-9]/gi, '-')}-${timestamp}.png`;
            const screenshotPath = path.join(folderPath, fileName);

            const buffer = await page.screenshot();
            fs.writeFileSync(screenshotPath, buffer);

            await test.info().attach(stepName, {
                body: buffer,
                contentType: 'image/png'
            });
        } catch (error) {
            console.error('SS alma sırasında hata oluştu ama test devam ediyor:', error);
        }
    }
}