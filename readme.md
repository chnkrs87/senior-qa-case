🏆 Senior QA Case Study

Bu depo, modern yazılım geliştirme yaşam döngüsünde (SDLC) uygulanan kapsamlı kalite güvence stratejilerini sergilemek amacıyla hazırlanmıştır. 
Proje; Web, Mobil, API ve Performans katmanlarını kapsayan, CI/CD entegrasyonuna sahip uçtan uca bir test çözümüdür.

# 🏗️ Proje Mimarisi ve Teknoloji Yığınları

Proje, her test katmanı için en optimize araçlar seçilerek modüler bir yapıda kurgulanmıştır:

    Katman	            Araçlar	                            Mimari / Yaklaşım
    Web UI Testing	    WebdriverIO, TypeScript, Axe-core	Cross-browser, Responsive, Accessibility Audit
    Mobile Web	        WebdriverIO, BrowserStack	        Real Device (iOS/Android) W3C Cloud Testing
    API Testing	        Postman, Playwright, Newman	        Request Chaining, CRUD Lifecycle, Schema Validation
    Performance	        k6, JavaScript	                    Workload Modeling, Stress & Spike Testing
    Automation	        Playwright, GitHub Actions	        Page Object Model (POM), Pipeline as Code

# 🎯 Temel Yetkinlik Göstergeleri (Key Achievements)

•	Multi-Browser Coverage: Testlerin Chrome, Firefox ve Edge üzerinde paralel koşumu.
•	Accessibility First: WCAG 2.1 AA standartlarının otomasyona entegrasyonu.
•	Resilience Engineering: Performans testleriyle sistemin "Breaking Point" analizi ve Self-healing kapasitesinin ölçümü.
•	CI/CD Maturity: GitHub Actions üzerinden her push sonrası otomatik kalite kontrolü ve artifact yönetimi.
•	Cloud Testing: Gerçek cihazlar üzerinde bulut tabanlı test yürütme yetkinliği.

📑 Manuel Test ve Test Yönetimi

Otomasyonun ötesinde, kalite süreçlerinin temel taşı olan manuel senaryolar manual-testing/ klasöründe yer almaktadır. Bu bölümde:

•	Boundary Value Analysis (BVA) ve Equivalence Partitioning teknikleri.
•	Kritik yol (Critical Path) analizleri.
•	Hata raporlama şablonları (Bug Reporting) bulunmaktadır.

💡 Neden Bu Stratejiyi Seçtim?

Bu projenin temel felsefesi **"Doğru iş için doğru aracı seçmek"**tir.

•	WebdriverIO, karmaşık web ve mobil entegrasyonlarındaki esnekliği için,
•	Playwright, API ve hızlı otomasyon döngüleri için,
•	k6, Go tabanlı yüksek performanslı yük testleri için tercih edilmiştir.

🛠️ Teknik Ekosistem ve Yazılım Gereksinimleri

Bu proje; Web, API, Mobil ve Performans katmanlarında en güncel QA araç setlerini kullanmaktadır. Başarılı bir test koşumu için aşağıdaki bileşenlerin hazır olması gerekmektedir.

1. Temel Yazılım ve IDE Yapılandırması

    1.1. IDE: Visual Studio Code (VS Code)

    1.2. Önerilen Extension'lar: * ESLint & Prettier: Kod standartları ve formatlama için.

    1.3. Allure Handle: Raporları IDE üzerinden yönetmek için.

    1.4. Playwright Test: Playwright testlerini koşturmak ve debug etmek için.

    1.5. Thunder Client: (Opsiyonel) Hafif API isteklerini VS Code içinde test etmek için.

    1.6. Runtime: Node.js (v18+) & npm
    
    1.7. Java SDK (JDK 11+): Allure Raporlama motorunun çalışması için zorunludur.

2. Modül Bazlı Araç Setleri ve Platform Erişimi

A. Web & Mobil Test (UI Layer)

•	Framework: WebdriverIO (v8) & Playwright.
•	BrowserStack (Cloud Device Farm): * Gerçek iOS ve Android cihazlara erişim için browserstack.com hesabı gereklidir.
•	Local Testing: Mobil tarayıcıları yerel ağda test etmek için BrowserStack Local binary yüklü olmalıdır.
•	Axe-Core: Erişilebilirlik taramaları için WDIO entegrasyonu.

B. API Test Katmanı

•	Postman (Desktop App): Koleksiyonların manuel testi ve düzenlenmesi için.
•	Newman (CLI): Postman koleksiyonlarını terminal üzerinden (CI/CD uyumlu) çalıştırmak için.
•	Restful-Booker API: Testlerin koşturulduğu hedef platform (https://restful-booker.herokuapp.com)

C. Performans Test Katmanı

•	k6 (by Grafana): Yüksek performanslı yük testleri için Go tabanlı CLI aracı.
•	Kurulum (Windows): winget install k6
•	Kurulum (Mac): brew install k6

3. Adım Adım Kurulum (Step-by-Step Setup)

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

