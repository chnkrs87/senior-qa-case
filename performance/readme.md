📈 Performance Engineering & Load Testing (k6)

Bu modül, sistemin dayanıklılığını, ölçeklenebilirliğini ve sınır değerlerini ölçmek amacıyla k6 kullanılarak geliştirilmiş kapsamlı bir performans analiz suite'idir. 
Testler, gerçek dünya trafik modellerini (Workload Modeling) simüle ederek sistemin "Breaking Point" ve "Recovery" kapasitesini ölçer.

📊 Workload Model ve Test Analizi

Sistemin davranışını analiz etmek için 4 aşamalı bir yük modeli uygulanmıştır.

    Test Türü	Yük (VU)	Süre	Amaç	
    Load Test	50	        5m	    Normal trafik altında baz performans ölçümü.	
    Stress Test	200	        10m	    Sistemin sınır değerlerini ve darboğaz tespiti.	
    Spike Test	0→500→0	    3m	    Ani trafik şoklarına karşı esneklik kontrolü.	
    Soak Test	30	        30m	    Uzun süreli stabilite ve bellek sızıntısı analizi.	

# 📊 Test Dashboard & Reports

⚡ **Performance** | K6 Load Testing | [Raporu Görüntüle](https://chnkrs87.github.io/senior-qa-case/performance/)

📈 Performans Metrikleri ve Görsel Raporlama

    1. SLA Uyumluluğu (Response Time)

        Sistem ortalama 107.10 ms yanıt süresi ile 2000ms olan SLA hedefinin çok altında kalarak yüksek hızda performans sergilemiştir.

    2. Verimlilik (Throughput)

        Saniyede ortalama 128.39 istek (RPS) işlenmiş, toplamda ~370 bin istek başarıyla yönetilmiştir.

    3. Hata Oranları (Error Rate)

        Toplam başarı oranı %99.29 olarak gerçekleşmiştir. Meydana gelen hataların tamamı Spike fazındaki aşırı yüklenme anında gözlemlenmiştir.

🔍 Teknik Gözlemler ve Mimari Analiz (Senior Perspective)

    1.	Breaking Point: Sistem 200 VU (Stress) seviyesine kadar lineer bir performans sergilemektedir. Ancak 500 VU (Spike) anında TCP bağlantı hataları (connectex) üretmeye başlamıştır.

    2.	Recovery Failure: Spike testi sonrası yük 30 VU seviyesine (Soak) düşürülmesine rağmen hataların devam ettiği gözlemlenmiştir. Bu durum, sistemin Self-Healing (kendi kendini iyileştirme) kapasitesinin zayıf olduğunu ve Connection Pool kaynaklarının düzgün serbest bırakılmadığını kanıtlamaktadır.

    3.	Resilience Risk: Ani trafik artışları sonrası sistemin manuel müdahale olmadan eski stabil haline dönmemesi, prod ortamı için operasyonel bir risk teşkil etmektedir.

🛠️ Stratejik Öneriler

    •	Connection Pooling: Veritabanı ve uygulama sunucusu arasındaki bağlantı havuzu ayarları, yüksek concurrency durumları için optimize edilmeli.

    •	Auto-Scaling: HPA (Horizontal Pod Autoscaler) politikaları, sadece CPU/RAM değil, "Request per Second" bazlı tetiklenecek şekilde yapılandırılmalı.

    •	Caching: Ani yük şoklarını karşılamak için uygulama önüne Redis gibi bir önbellekleme katmanı eklenmeli.

⚙️ Kurulum ve Çalıştırma

    1.	k6 Kurulumu (Windows/Winget):

    Bash
    winget install k6

    2.	Testi Çalıştırma:

    Bash
    k6 run performance/scripts/main_test.js

