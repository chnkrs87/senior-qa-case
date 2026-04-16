🛰️ Restful-Booker API Automation Suite

Bu proje, Restful-Booker platformu üzerinde uçtan uca API test süreçlerini, modern mimari yaklaşımlar ve farklı araç setleri (Postman & Playwright) kullanarak doğrular. Proje, hem hızlı test koşumu (Postman) hem de ölçeklenebilir kod tabanlı (Playwright) yaklaşımları bir arada sunar.

📌 Proje Amacı ve Kapsamı

API katmanında güvenilirliği sağlamak amacıyla, kimlik doğrulama ve veri bütünlüğü süreçleri test edilmiştir.
•	Request Chaining: Token generation ve bookingId'nin bir sonraki isteklerde dinamik kullanımı.
•	Full CRUD Lifecycle: Rezervasyon oluşturma, görüntüleme, güncelleme ve silme döngüsü.
•	Hata Yönetimi: Geçersiz yetki ve olmayan kayıtlar için negatif test senaryoları (403, 404).

# 📊 Test Dashboard & Reports

🛠 **API Tests** | Playwright / Rest-Assured | [Raporu Görüntüle](https://chnkrs87.github.io/senior-qa-case/api/)

🛠️ Kullanılan Araçlar ve Frameworkler

Araç	Kapsam	Avantajı
Postman / Newman	Koleksiyon Bazlı Testler	Hızlı prototipleme ve kolay paylaşım.
Playwright (API)	Kod Bazlı Testler	TypeScript tip güvenliği ve CI/CD uyumu.
Allure Report	Görsel Raporlama	Teknik detayların görsel dökümantasyonu.

🚀 3.1. Postman & Newman Entegrasyonu

9 temel senaryo, birbirine bağlı bir zincir yapısıyla kurgulanmıştır.

•	Klasör Yolu: api-tests/postman/
•	Talimat: Projenin ana dizininde aşağıdaki komutla testleri terminal üzerinden koşturabilirsiniz:

Bash
npm run test:api
(Bu komut arka planda Newman ile collection ve environment dosyalarını eşleştirerek çalıştırır.)

🏗️ 3.2. Playwright & TypeScript (Modern Mimari)

Teknik yetkinlik ve esneklik göstergesi olarak, aynı senaryolar Playwright kullanılarak kodlanmıştır.
•	Klasör Yolu: api-tests/rest_assured_playwright/
•	Öne Çıkan Özellikler:
o	Type Safety: TypeScript ile sağlam ve bakımı kolay kod yapısı.
o	Dynamic Auth: Her koşu öncesi otomatik token yenileme.
o	Allure Integration: Test sonuçlarının adım adım görsel analizi.

📊 Çalıştırma ve Raporlama

Bash
# Testleri koşturmak için:

npx playwright test

# Görsel raporu görüntülemek için:

npx allure serve reports/allure-results

💡 Önemli Kararlar ve Gerekçeleri
•	Request Chaining: Manuel veri kopyalamayı ortadan kaldırmak için bookingId'ler global değişkenler aracılığıyla bir sonraki isteğe otomatik aktarılmıştır.
•	Neden Playwright API? Hız ve paralel koşu kapasitesi sayesinde, API testlerini UI testleriyle aynı raporlama arayüzünde (Allure) birleştirmek için tercih edilmiştir.



