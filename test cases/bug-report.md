# Bug Report: BUG-001 - Password Field Lack of Max Length Constraint
    •	Bulgu ID: BUG-001

    •	Bulgu Başlığı: Şifre giriş alanında (Password Field) karakter sınırı (maxlength) bulunmaması.

    •	Modül: Kullanıcı Kimlik Doğrulama (Login)

    •	Öncelik (Priority): Low (P3)

    •	Ciddiyet (Severity): Medium
    
    •	TC : TC-0010-Login-Şifre alanı karakter sınırı doğrulaması

![Screenshot](senior-qa-case/test-cases/bug-screenshots/bug-001-ss-001.png)

    1. Özet: Login sayfasındaki şifre giriş alanında herhangi bir karakter sınırlaması (maxlength attribute) bulunmamaktadır. Kullanıcı bu alana sınırsız uzunlukta veri girebilmektedir.
    2. Yeniden Üretme Adımları (Steps to Reproduce):

        2.1.	https://www.saucedemo.com/ adresine gidilir.
        2.2.	Kullanıcı adı alanına geçerli bir kullanıcı adı girilir.
        2.3.	Şifre alanına 1.000+ karakterlik bir metin (veya brute-force test verisi) yapıştırılır.
        2.4.	"Login" butonuna tıklanır.
        2.5.	Network trafiği ve tarayıcı performansı gözlemlenir.

    3. Beklenen Sonuç (Expected Result): Şifre alanının güvenlik ve performans standartları gereği makul bir sınırda (örneğin 128 karakter) girişi durdurması veya HTML seviyesinde maxlength özniteliğine sahip olması beklenmektedir.

    4. Gerçekleşen Sonuç (Actual Result): HTML kodunda <input data-test="password"> etiketinde maxlength özniteliği tanımlanmamıştır. Sistem çok uzun dizileri kabul ederek sunucuya iletmeye çalışmaktadır.

    5. Risk Analizi:
    •	Performans: Çok uzun karakter dizileri tarayıcının donmasına (client-side freeze) neden olabilir.
    •	Güvenlik: Arka planda bu verinin işlenmesi sırasında ReDoS (Regular Expression Denial of Service) veya Buffer Overflow risklerine zemin hazırlayabilir.
    •	Öneri: Frontend tarafında HTML input alanına maxlength="128" kısıtlaması getirilmelidir. Arka planda (Server-side) da bu sınır doğrulanmalıdır.
