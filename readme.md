# 🚀 Senior QA Engineering Case Study

## 📂 Proje Yapısı

- **`api-tests/`**: API koleksiyonları ve dokümantasyonu.
- **`automation/`**: Web/API otomasyon çalışmaları (varsa).
- **`mobile/`**: Mobil uygulama test notları ve cihaz spesifik gözlemler.
- **`performance/`**: k6 performans scriptleri ve detaylı raporlar.
- **`test-cases/`**: Manuel test senaryoları ve Markdown formatında Bug Raporları.

# Performans Test #

## 📊 Performans Test Analizi

Sistemin dayanıklılığını ölçmek için 4 aşamalı bir iş yükü modeli (Workload Model) uygulanmıştır.

### ⚙️ Test Senaryoları ve Hedefler

| Test Türü | Yük (VU) | Süre | Amaç | Sonuç |
| :--- | :---: | :---: | :--- | :--- |
| **Load Test** | 50 | 5m | Normal trafik altında baz performans ölçümü. | ✅ Başarılı |
| **Stress Test** | 200 | 10m | Sistemin sınır değerlerini ve darboğazlarını tespit. | ✅ Başarılı |
| **Spike Test** | 0→500→0 | 3m | Ani trafik şoklarına karşı esneklik ve toparlanma. | ⚠️ Risk Tespit Edildi |
| **Soak Test** | 30 | 30m | Uzun süreli yük altında stabilite ve bellek sızıntısı. | ❌ Stabilite Sorunu |

### 📈 Görsel Raporlar

#### 1. Genel Metrikler ve SLA Uyumluluğu
Sistem ortalama **107.10 ms** yanıt süresi ile 2000ms olan SLA hedefinin çok altında kalarak yüksek hızda performans sergilemiştir.
![Performans Metrikleri](performance/results/screenshots/report-001.png)

#### 2. Test Yürütme Detayları (Throughput)
Saniyede ortalama **128.39** istek işlenmiş, toplamda ~370 bin istek başarıyla yönetilmiştir.
![Test Detayları](performance/results/screenshots/report-002.png)

#### 3. Başarı Oranları (Checks)
Toplam başarı oranı **%99.29** olarak gerçekleşmiştir. 1,315 adet hata Spike fazında gözlemlenmiştir.
![Doğrulama Sonuçları](performance/results/screenshots/report-003.png)

## 🔍 Teknik Gözlemler ve Analiz (Senior Perspective)

1. **Breaking Point:** Sistem 200 VU (Stress) seviyesine kadar kusursuz çalışmaktadır. Ancak 500 VU (Spike) anında TCP bağlantı hataları (`connectex`) üretmeye başlamıştır.
2. **Recovery Failure:** Spike testi sonrasında yük 30 VU seviyesine (Soak) düşürülmesine rağmen hataların devam ettiği gözlemlenmiştir. Bu durum, sistemin **Self-Healing** (kendi kendini iyileştirme) kapasitesinin zayıf olduğunu ve kaynakların (Connection Pool) düzgün serbest bırakılmadığını kanıtlamaktadır.
3. **Resilience Risk:** Ani trafik artışları sonrası sistemin manuel müdahale olmadan eski stabil haline dönmemesi, prod ortamı için operasyonel bir risk teşkil etmektedir.

### 🛠️ Öneriler
- **Altyapı:** Veritabanı ve uygulama sunucusu arasındaki bağlantı havuzu (Connection Pooling) ayarları optimize edilmeli.
- **Ölçeklendirme:** HPA (Horizontal Pod Autoscaler) politikaları, CPU/RAM metriklerinin yanı sıra "Request per Second" bazlı da tetiklenmeli.
- **Cache:** Ani yükleri karşılamak için önbellekleme (Redis vb.) stratejileri devreye alınmalı.

## 🛠️ Kurulum ve Çalıştırma

### Performans Testlerini Koşturmak İçin:
    1. [k6](https://k6.io/) aracını sisteminize kurun.
    2. # Winget ile:
        winget install k6
    3. # Proje ana dizinindeyken aşağıdaki komutlarla gerekli klasörleri oluşturabilirsiniz:
        Performans klasörü ve alt dizinleri
        mkdir -p performance/scripts
        mkdir -p performance/results/screenshots
    4. Çalıştırma
        k6 run performance/scripts/main_test.js


# x Test #

    asdasd