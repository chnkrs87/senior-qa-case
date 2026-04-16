🚀 OrangeHRM - Web Test (Cross-browser & Responsive)

Bu proje, OrangeHRM platformunun login akışını, responsive tasarımını ve erişilebilirlik (accessibility) standartlarını doğrulamak amacıyla geliştirilmiş kapsamlı bir test otomasyon framework'üdür.

📌 Proje Amacı ve Kapsamı

Proje, bir Senior QA'in otomasyon süreçlerine yaklaşımını sergilemek amacıyla hazırlanmıştır. Sadece fonksiyonel testleri değil, aynı zamanda modern web standartları olan erişilebilirlik ve multi-browser uyumluluğunu da kapsar.

    •	Login: Dashboard yönlendirmesinin görsel ve metinsel doğrulanması.
    •	Responsive Testing: Desktop, Laptop, Tablet ve Mobile çözünürlüklerde UI bütünlüğü.
    •	Accessibility Audit: WCAG 2.1 AA standartlarına göre derinlemesine tarama.

    🌐 Test Edilen Uygulama
    •	Uygulama: OrangeHRM Open Source Demo
    •	URL: https://opensource-demo.orangehrmlive.com/
    •	Versiyon: v5.x (Cloud Demo)

# 📊 Test Dashboard & Reports

🌐 **Web Tests** | Playwright | [Raporu Görüntüle](https://chnkrs87.github.io/senior-qa-case/web/)

🛠 Kullanılan Araçlar ve Versiyonlar

Araç	Versiyon	Kullanım Amacı
WebdriverIO	v8.x	Ana Test Framework
Node.js	v18+	Runtime Ortamı
Axe-core (WDIO)	v4.x	Erişilebilirlik Otomasyonu
Allure Reporter	v2.x	Gelişmiş Görsel Raporlama
TypeScript	v5.x	Tip Güvenliği ve Kod Kalitesi

⚙️ Kurulum ve Çalıştırma
1.	Projeyi Klonlayın:

Bash
git clone <proje-url>
cd senior-qa-case/web-test

2.	Bağımlılıkları Yükleyin:

Bash
npm install

3.	Testleri Koşturun:

Bash
npx wdio run wdio.conf.ts

4.	Raporu Görüntüleyin:

Bash
npx allure serve ./reports/allure-results

💡 Önemli Kararlar ve Gerekçeleri

•	Neden WebdriverIO? Eşzamanlı (Parallel) test koşumu ve devtools entegrasyonu sayesinde hızı artırmak ve karmaşık asenkron işlemleri (explicit waits) kolayca yönetmek için tercih edilmiştir.
•	Axe-core Entegrasyonu: Erişilebilirliği manuel bir süreçten çıkarıp CI/CD'ye entegre edilebilir bir "Deep Scan" yapısına dönüştürmek için kullanılmıştır.
•	Explicit Wait Stratejisi: Uygulamanın demo sunucularındaki yük dalgalanmalarına karşı waitForDisplayed ve waitUntil kullanılarak testlerin "flaky" (kararsız) olması engellenmiştir.
•	Multi-Browser: Chrome, Firefox ve Edge tarayıcıları eşzamanlı çalıştırılarak çapraz tarayıcı uyumluluğu %100 kapsama altına alınmıştır.

⚠️ Bilinen Kısıtlamalar ve Eksiklikler

•	Captcha/Security: Demo sitesindeki olası güvenlik duvarları nedeniyle testler bazen IP engeline takılabilir (Wait süreleri bu yüzden yüksek tutulmuştur).
•	Accessibility Fails: Tespit edilen 5 erişilebilirlik hatası (HTML lang eksikliği, kontrast sorunları vb.) uygulamanın kendi hatalarıdır; otomasyon bu hataları raporlamak için bilerek başarısız (failed) statüsünde bırakılmıştır.
•	Lighthouse: CI/CD ortamlarında kaynak tüketimi nedeniyle Lighthouse taraması yerine Axe-core tercih edilmiştir; manuel analizler için Lighthouse raporları ayrıca sunulabilir.

