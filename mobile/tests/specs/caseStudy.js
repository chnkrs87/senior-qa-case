import { expect, browser, $ } from '@wdio/globals'

describe('Senior QA Case Study - Adim Adim İspatli Test Paketi', () => {

    
    beforeEach(async () => {
        await browser.url('https://www.saucedemo.com/');
        const username = await $('#user-name');
        
        if (await username.isDisplayed()) {
            await username.setValue('standard_user');
            await $('#password').setValue('secret_sauce');
            await $('#login-button').click();
            await $('.inventory_list').waitForDisplayed({ timeout: 5000 });
        }
    });

    it('S1: Kullanici basarili sekilde login olabilmeli', async () => {
        const inventoryList = await $('.inventory_list');
        await expect(inventoryList).toBeDisplayed();
        await browser.takeProof('S1_Login_Basarili_Kontrol'); 
    });

    it('S2: Sayfa sonuna kadar scroll yapilabilmeli', async () => {
        const footer = await $('footer');
        await footer.scrollIntoView();
        await expect(footer).toBeDisplayed();
        await browser.takeProof('S2_1_Sayfa_Sonu_Scroll'); 
    });

    it('S3: Sepete urun ekleme ve Badge kontrolü', async () => {
        await browser.takeProof('S3_1_Ekleme_Oncesi');
        
        const addToCart = await $('#add-to-cart-sauce-labs-backpack');
        await addToCart.waitForDisplayed({ timeout: 5000 });
        await addToCart.click();

        const badge = await $('.shopping_cart_badge');
        await badge.waitForDisplayed({ timeout: 5000 });
        
        await expect(badge).toHaveText('1');
        await browser.takeProof('S3_2_Urun_Eklendi_Badge_Guncel');

        
        await badge.click();
        await expect($('.cart_item')).toBeDisplayed();
        await browser.takeProof('S3_3_Sepet_Icerigi_Dogrulama');
    });

    it('S4: Responsive gorunum ve Orientation kontrolu', async () => {
        if (browser.isMobile) {
            await browser.setOrientation('landscape');
            await browser.pause(1500);
            await browser.takeProof('S4_1_Mobil_Yatay_Gorunum');
            
            await browser.setOrientation('portrait');
            await browser.pause(1500);
            await browser.takeProof('S4_2_Mobil_Dikey_Gorunum');
        } else {
            await browser.setWindowSize(800, 600);
            await browser.takeProof('S4_1_Desktop_Kucuk_Ekran');
        }
    });

    it('S5: Responsive Layout Kontrolu (Her Adım SS)', async () => {
    const size = await browser.getWindowSize();
    const width = size.width;

    await browser.takeProof(`S5_1_Baslangic_${width}px`);

    const menuBtn = await $('.bm-burger-button');
    await menuBtn.waitForDisplayed({ timeout: 5000 });
    
    try {
        await menuBtn.click();
    } catch (e) {
        await browser.execute((el) => el.click(), menuBtn);
    }
    
    await browser.pause(2000); 
    await browser.takeProof(`S5_2_Menu_Acildi_${width}px`);

    const closeBtn = await $('#react-burger-cross-btn');
    
  
    await closeBtn.waitForExist({ timeout: 5000 });
    
    try {
        await browser.execute((el) => el.click(), closeBtn);
    } catch (e) {
        console.log("Normal click başarısız, menü açık kalmış olabilir.");
    }
    
    await browser.pause(1500); 
    await browser.takeProof(`S5_3_Menu_Kapandi_${width}px`);
    
    await browser.execute(() => window.scrollTo(0, 500));
    await browser.takeProof(`S5_4_Layout_Check_${width}px`);
});

    it('S6: Cihazin yan cevrilme durumu dogrulanmali', async () => {
    if (browser.isMobile) {
        await browser.setOrientation('landscape');
        await browser.pause(2000); 
        
        const logo = await $('.app_logo');
        await logo.waitForDisplayed({ timeout: 5000 });
        await browser.takeProof('S6_1_Yatay_Mod_Kontrol');

        const closeBtn = await $('#react-burger-cross-btn');
        
        if (await closeBtn.isExisting()) {
            try {
                
                await closeBtn.click();
            } catch (e) {
                await browser.execute((el) => el.click(), closeBtn);
            }
            await browser.pause(1000);
        }

        await browser.setOrientation('portrait');
        await browser.pause(1500);
        await browser.takeProof('S6_2_Dikey_Mod_Final');
        
    } else {
        console.log("Desktop: S6 Atlandi.");
    }
});
});