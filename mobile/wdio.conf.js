import fs from 'fs';
import path from 'path';

export const config = {
    user: 'cihankiri_KSvWc3',
    key: 'Z5L5rpjq6cBYnxZhRS14',

    specs: ['./tests/specs/**/*.js'],

    maxInstances: 1, 
    capabilities: [
        {
            'bstack:options': {
                deviceName: 'Samsung Galaxy S23',
                osVersion: '13.0',
                realMobile: 'true'
            }
        },
        {
            'bstack:options': {
                deviceName: 'iPhone 14',
                osVersion: '16',
                realMobile: 'true'
            }
        }
    ],

    logLevel: 'error', 
    services: [['browserstack', {
        testObservability: true,
        testObservabilityOptions: { projectName: "Senior QA Project", buildName: "Build 1.0" },
        opts: { showLog: false }
    }]],
    
    framework: 'mocha',
    
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    
    reporters: ['spec'],

    onPrepare: function () {
        ['./log', './logs'].forEach(folder => {
            if (fs.existsSync(folder)) fs.rmSync(folder, { recursive: true, force: true });
            fs.mkdirSync(folder, { recursive: true });
        });

        const reportDir = './reports/screenshots';
        if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });
        
        fs.writeFileSync('./mobile-test-notes.md', '# 📱 Mobil Otomasyon Adım Adım İspat Raporu\n\n---\n');
    },

    before: async function () {
        browser.addCommand("takeProof", async function (stepDescription) {
            const caps = browser.capabilities;
            const device = caps.deviceName || caps['bstack:options']?.deviceName || caps.browserName || 'Unknown_Device';
            
            const isOnline = await browser.execute(() => window.navigator.onLine);
            const netStatus = isOnline ? 'ONLINE' : 'OFFLINE';
            
            const cleanName = stepDescription.toLowerCase().replace(/[^a-z0-9]/g, '_');
            const cleanDevice = device.replace(/\s+/g, '_');
            const fileName = `${cleanName}_${netStatus}_${cleanDevice}.png`;
            const filePath = path.join('./reports/screenshots', fileName);

            await browser.saveScreenshot(filePath);

            const logEntry = `\n### 📸 Adım: ${stepDescription}\n- **Durum:** ${netStatus} | **Cihaz:** ${device}\n- ![Screenshot](./reports/screenshots/${fileName})\n`;
            fs.appendFileSync('./mobile-test-notes.md', logEntry);
        });
    },

    afterTest: async function (test, context, { error, passed }) {
        if (!passed) {
            await browser.takeProof(`HATA_${test.title}`);
        }
    }
};