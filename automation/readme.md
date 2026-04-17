🎭 Playwright Automation Suite (+CI/CD)

Bu modül, modern web uygulamaları için hız, kararlılık ve paralel koşum odaklı geliştirilmiş Playwright & TypeScript tabanlı bir otomasyon altyapısıdır. 
Proje, sadece test koşumu değil, tam entegre bir QA Pipeline deneyimi sunar.

🚀 Öne Çıkan Teknik Özellikler

    •	Cross-Browser Testing: Chromium ve Firefox üzerinde eşzamanlı ve izole test koşumu.

    •	Page Object Model (POM): Sürdürülebilir, modüler ve DRY (Don't Repeat Yourself) prensiplerine uygun mimari.

    •	Custom Screenshot Engine: Her test adımı için hiyerarşik ve senaryo bazlı isimlendirilmiş görsel kanıt sistemi.

    •	CI/CD Pipeline Entegrasyonu: GitHub Actions üzerinde Node.js 24 ortamında her push sonrası otomatik validasyon.

# 📊 Test Dashboard & Reports

📱 **Automation** | Playwright | [Raporu Görüntüle](https://chnkrs87.github.io/senior-qa-case/automation/)

🛠️ Kurulum ve Çalıştırma

1.	Bağımlılık Yönetimi:

    Bash
    cd automation
    npm install

2.	Tarayıcı Motorlarının Kurulumu:

    Bash
    npx playwright install --with-deps

⚡ GitHub Actions & CI/CD Operasyon Süreci

🔄 Pipeline Akışı

    1.	Trigger: Kodun main şubeye gönderilmesiyle .github/workflows/playwright.yml tetiklenir.

    2.	Environment: GitHub Ubuntu Runner üzerinde Node.js 24 ortamı hazırlanır.

    3.	Cloud Execution: Bağımlılıklar kurulur ve testler "Headless" modda otomatik çalıştırılır.

    4.	Artifact Archiving: Test sonuçları (başarılı veya hatalı) fark etmeksizin, oluşan tüm ekran görüntüleri ve raporlar GitHub üzerinde arşivlenir.

🔍 Bulut Kanıtlarının İncelenmesi

    •	GitHub Actions sekmesine gidilir.
    •	İlgili "Workflow Run" seçilerek sayfanın altındaki Artifacts bölümünden screenshots.zip indirilerek test kanıtları incelenebilir.

💡 Neden Playwright Tercih Edildi?

Modern web ihtiyaçları doğrultusunda Playwright seçiminin 5 temel gerekçesi:

1.	Efficiency (Verimlilik): "Browser Context" mimarisi ile her test için saniyeler içinde izole profiller oluşturarak test süresini minimize eder.

2.	Auto-Wait (Akıllı Bekleme): Elemanların etkileşime hazır olmasını otomatik bekleyerek "Flaky Test" oranını ciddi oranda düşürür.

3.	Native Support: Shadow DOM ve karmaşık iframe yapılarına ek konfigürasyon gerekmeden doğrudan erişim sağlar.

4.	Trace Viewer: Hata anında network isteklerini, konsol loglarını ve DOM durumunu geriye dönük inceleme imkanı (MTTR - Mean Time To Repair düşürülmesi) sunar.

5.	True Cross-Browser: Tek bir API ile Chromium, Firefox ve WebKit üzerinde %100 uyumluluk garantisi sağlar.

