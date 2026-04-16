// @ts-nocheck
/// <reference types="node" />
import fs from 'fs';
import type { Options } from '@wdio/types';
const allureReporter = require('@wdio/allure-reporter').default;

export const config: Options.Testrunner = {
    runner: 'local',
    specs: ['./tests/specs/**/*.ts'],
    maxInstances: 2,
    capabilities: [
        {
            browserName: 'chrome',
            'goog:chromeOptions': { args: ['--headless', '--disable-gpu', '--no-sandbox'] }
        },
        {
            browserName: 'firefox',
            'moz:firefoxOptions': { args: ['-headless'] }
        },
        {
            browserName: 'MicrosoftEdge',
            'ms:edgeOptions': { args: ['--headless', '--disable-gpu'] }
        }
    ],
    logLevel: 'error',
    baseUrl: 'https://opensource-demo.orangehrmlive.com',
    waitforTimeout: 15000,
    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', { outputDir: './reports/allure-results', disableWebdriverStepsReporting: false }]
    ],
    mochaOpts: { timeout: 120000 },
    onPrepare: function () {
        if (!fs.existsSync('./reports')) fs.mkdirSync('./reports', { recursive: true });
    },
    afterTest: async function (test, context, { error }) {
        try {
            const screenshot = await browser.takeScreenshot();
            allureReporter.addAttachment('Screenshot', global.Buffer.from(screenshot, 'base64'), 'image/png');
        } catch (e) {
            console.log('Ekran görüntüsü alınamadı.');
        }
    }
};