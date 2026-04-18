📱 Mobile Web Automation & Cloud Execution (BrowserStack)

Bu modül, SauceDemo platformunun gerçek mobil cihazlar üzerindeki web performansını ve UI bütünlüğünü doğrulamak amacıyla geliştirilmiştir. 
Altyapı, ek bir Appium katmanına ihtiyaç duymadan WebdriverIO ve BrowserStack W3C protokolü üzerinden doğrudan mobil tarayıcıları hedeflemektedir.

📌 Proje Amacı ve Kapsamı

Mobil web deneyimini (Mobile Web vs. Native) optimize etmek için gerçek cihazlar (Android & iOS) üzerindeki tarayıcı davranışlarını kapsar.

    •	Pure Mobile Web: Native uygulama gereksinimi olmadan, doğrudan mobil Chrome ve Safari üzerinde otomasyon.

    •	W3C Protocol Efficiency: BrowserStack üzerinde doğrudan mobil yetenekleri (capabilities) kullanarak düşük gecikmeli test koşumu.

    •	Multi-Device Coverage: Samsung Galaxy serisi (Android) ve iPhone (iOS) cihazlarında çapraz tarayıcı doğrulaması.

🛠️ Kullanılan Araçlar ve Versiyonlar

    Device 1#: İphone 14 / Os: 16
    
    Device 2#: Samsung Galaxy S23 / Os: Android: 13
    
    WebdriverIO	v8.x - Ana Otomasyon Framework'ü

    BrowserStack - Real Device Cloud - Bulut Tabanlı Gerçek Cihaz Erişimi

    Markdown Reporter - Custom - Screenshot Entegreli Adım Bazlı Raporlama

⚙️ Kurulum ve Çalıştırma

    1.	Bağımlılıkları Yükleyin:

        Bash
        cd mobile-automation
        npm install

    2.	Hızlı Koşum:

        Bash
        npx wdio run wdio.conf.ts

🔍 Teknik Gözlemler ve Mühendislik Kararları

🚩 Senaryo 7: Network Interruption Analizi 

Bu senaryoda, cihazın tamamen çevrimdışı (Offline) kalması durumundaki davranışlar analiz edilmiştir.

Kısıtlama ve Karar:

    •	Bağlantı Kesintisi: Bulut tabanlı gerçek cihazlarda (BrowserStack) network tamamen kesildiğinde, WebDriver iletişimi (W3C Session) sonlanmaktadır.

    •	Test Tercihi: Bu senaryo, otomasyonun "Session Not Found" hatasıyla çökmesini engellemek adına test setinden çıkarılmış ve mobile/mobile-test-notes.md raporu üzerinde teknik dökümantasyonu yapılmıştır.

💡 Neden Appium Yerine Doğrudan WDIO?

•	Hız: Ek bir Appium sunucusu katmanı olmadığı için mobil web testleri çok daha hızlı başlar ve yürütülür.

•	Stabilite: Doğrudan tarayıcı sürücülerini (ChromeDriver/SafariDriver) hedeflemek, "flaky" (kararsız) test oranını azaltır.

