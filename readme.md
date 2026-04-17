Senior QA Case Study

Bu depo, modern yazılım geliştirme yaşam döngüsünde (SDLC) uygulanan kapsamlı kalite güvence stratejilerini sergilemek amacıyla hazırlanmıştır. 
Proje; Web, Mobil, API ve Performans katmanlarını kapsayan ve otomasyon için CI/CD entegrasyonuna sahip bir test çözümüdür.

# Proje Mimarisi ve Teknolojisi

Proje, her test katmanı için en optimize araçlar seçilerek modüler bir yapıda kurgulanmıştır:

    Katman	            Araçlar	                                Mimari / Yaklaşım
    Web UI Testing	    WebdriverIO, TypeScript, Axe-core	    Cross-browser, Responsive, Accessibility Audit
    Mobile Web	        WebdriverIO, BrowserStack	            Real Device (iOS/Android) W3C Cloud Testing
    API Testing	        Postman, Playwright, Newman	            Request Chaining, CRUD Lifecycle, Schema Validation
    Performance	        k6, JavaScript	                        Workload Modeling, Stress & Spike Testing
    Automation	        Playwright, GitHub Actions	            Page Object Model (POM), Pipeline as Code

# 📊 Test Dashboard & Reports

Bu proje kapsamındaki tüm test sonuçları otomatik olarak GitHub Pages üzerinden yayınlanmaktadır:

🛠 **API Tests** | Playwright / Rest-Assured | [Raporu Görüntüle](https://chnkrs87.github.io/senior-qa-case/api/)

🌐 **Web Test (Cross-browser & Responsive)** | Playwright | [Raporu Görüntüle](https://chnkrs87.github.io/senior-qa-case/web/)

📱 **Automation** | Playwright | [Raporu Görüntüle](https://chnkrs87.github.io/senior-qa-case/automation/)

⚡ **Performance** | K6 Load Testing | [Raporu Görüntüle](https://chnkrs87.github.io/senior-qa-case/performance/)

# 🎯 Temel Yetkinlik (Key Achievements)

    1. Multi-Browser Coverage: Testlerin Chrome, Firefox ve Edge üzerinde paralel koşumu.

    2. Accessibility First: WCAG 2.1 AA standartlarının entegrasyonu.

    3. Resilience Engineering: Performans testleriyle sistemin "Breaking Point" analizi ve Self-healing kapasitesinin ölçümü.

    4. CI/CD Maturity: GitHub Actions üzerinden her push sonrası otomatik kalite kontrolü ve artifact yönetimi.

    5. Cloud Testing: Gerçek cihazlar üzerinde bulut tabanlı test yürütme yetkinliği.

📑 Manuel Test ve Test Yönetimi

Otomasyonun ötesinde, kalite süreçlerinin temel taşı olan manuel senaryolar test-cases/ klasöründe yer almaktadır. 

Bu bölümde:

    1. Boundary Value Analysis (BVA) ve Equivalence Partitioning teknikleri.

    2. Kritik yol (Critical Path) analizleri.

    3. Hata raporlama şablonları (Bug Reporting) bulunmaktadır.

💡 Neden Bu Stratejiyi Seçtim?

    1. WebdriverIO, karmaşık web ve mobil entegrasyonlarındaki esnekliği için,

    2. Playwright, API ve hızlı otomasyon döngüleri için,

    3. k6, Go tabanlı yüksek performanslı yük testleri için tercih edilmiştir.

🛠️ Teknik Ekosistem ve Yazılım Gereksinimleri

Bu proje; Web, API, Mobil ve Performans katmanlarında en güncel QA araç setlerini kullanmaktadır. 
Başarılı bir test koşumu için aşağıdaki bileşenlerin hazır olması gerekmektedir.

1. Temel Yazılım ve IDE Yapılandırması

    1.1. IDE: Visual Studio Code (VS Code)

    1.2. Allure Handle: Raporları IDE üzerinden yönetmek için.

    1.3. Playwright Test: Playwright testlerini koşturmak ve debug etmek için.

    1.4. Runtime: Node.js (v18+) & npm
    
    1.5. Java SDK (JDK 11+): Allure Raporlama motorunun çalışması için zorunludur.

2. Modül Bazlı Araç Setleri ve Platform Erişimi

A. Web & Mobil Test (UI Layer)

    1. Framework: WebdriverIO (v8) & Playwright.

    2. BrowserStack (Cloud Device Farm): * Gerçek iOS ve Android cihazlara erişim için browserstack.com hesabı gereklidir.

    3. Local Testing: Mobil tarayıcıları yerel ağda test etmek için BrowserStack Local binary yüklü olmalıdır.

    4. Axe-Core: Erişilebilirlik taramaları için WDIO entegrasyonu.

B. API Test Katmanı

    1. Postman (Desktop App): Koleksiyonların manuel testi ve düzenlenmesi için.

    2. Newman (CLI): Postman koleksiyonlarını terminal üzerinden (CI/CD uyumlu) çalıştırmak için.

    3. Restful-Booker API: Testlerin koşturulduğu hedef platform (https://restful-booker.herokuapp.com)

C. Performans Test Katmanı

    1. k6 (by Grafana): Yüksek performanslı yük testleri için Go tabanlı CLI aracı.

    2. Kurulum (Windows): winget install k6

    3. Kurulum (Mac): brew install k6

3. Kurulum 

    3.1. Adım: Depo Hazırlığı

        Bash

        git clone <repo-url>
        cd senior-qa-case
        npm install  # Tüm projenin ana bağımlılıklarını kurar

    3.2. Adım: Driver ve Tarayıcı Motorları

        Otomasyon motorlarının (Playwright) ihtiyaç duyduğu izole tarayıcı paketlerini sisteme tanımlayın:

        Bash

        npx playwright install --with-deps

    3.3. Adım: Çevresel Değişkenlerin Yapılandırılması (.env)

    Projenin kök dizininde veya ilgili modül klasörlerinde bir .env dosyası oluşturun ve aşağıdaki anahtarları kendi bilgilerinizle doldurun:

        Kod snippet'i

        BrowserStack Credentials
        BROWSERSTACK_USERNAME=your_username
        BROWSERSTACK_ACCESS_KEY=your_access_key

        API Auth (Opsiyonel)
        API_ADMIN_USER=admin
        API_ADMIN_PASSWORD=password123

4. Adım: Allure Raporlama Sistemini Aktif Etme

        Raporların görselleştirilmesi için Allure komut satırı aracının sistemde global olarak tanımlanması önerilir:

        Bash

        npm install -g allure-commandline

D. 🎭 Playwright Automation Suite (E2E & CI/CD)

Bu proje, modern web uygulamaları için hız ve kararlılık odaklı, Playwright & TypeScript tabanlı bir uçtan uca (E2E) otomasyon altyapısıdır. 
Sadece test koşumu değil, tam entegre bir QA Pipeline deneyimi sunarak yazılım kalitesini garanti altına alır.

🚀 Teknik Mimari & Öne Çıkanlar

    1. Cross-Browser Testing: Chromium ve Firefox üzerinde izole ve eşzamanlı test koşumu.

    2. Modern Mimari: Sürdürülebilir ve modüler Page Object Model (POM) ile DRY prensiplerine uygun kod yapısı.

    3. Smart Waiting: Playwright’ın Auto-wait özelliği ile flaky (istikrarsız) testlerin minimize edilmesi.

    4. Custom Reporting: Her adım için hiyerarşik isimlendirilmiş Screenshot Engine ve görsel kanıt sistemi.

⚙️ CI/CD & Otomasyon Süreci

Proje, her kod değişikliğinde otomatik çalışan bir Quality Gate yapısına sahiptir

    Aşama	        İşlem	                                                        Araç / Ortam
    Trigger	        main branch'e yapılan her push ile tetiklenme	                GitHub Actions
    Environment	    Node.js 24 & Linux tabanlı izole çalışma ortamı	                Ubuntu Runner
    Execution	    Bağımlılıkların yüklenmesi ve Headless test koşumu	            Playwright Engine
    Artifacts	    Başarılı/Hatalı tüm test ekran görüntülerinin arşivlenmesi	    GitHub Artifacts

🛠️ Hızlı Başlangıç

    Bash

    cd automation && npm install

    Tarayıcı motorlarını yükleyin;

    npx playwright install --with-deps

    Testleri çalıştırın

    npx playwright test

💡 Neden Bu Altyapı?

    Bu suite; Browser Context mimarisi sayesinde saniyeler içinde profil oluşturarak hızı artırır, 
    Trace Viewer desteği ile hata giderme süresini (MTTR) düşürür ve karmaşık DOM yapılarına (Shadow DOM, Iframe) yerleşik destek sunar.

