import { test, expect } from '@playwright/test';
import { allure } from "allure-playwright";

let authToken: string;
let bookingId: number;

test.describe('Senior QA Engineer - API Case Study', () => {

  // TC-001: POST /auth - Başarılı
  test('TC-API-001: Geçerli kullanıcı ile token al', async ({ request }) => {
    allure.suite("Authentication");
    const response = await request.post('/auth', {
      data: { username: 'admin', password: 'password123' }
    });
    const body = await response.json();
    authToken = body.token;

    await test.step(`DOĞRULAMA: Status 200 OK | Token: ${body.token?.substring(0,5)}...`, async () => {
      expect(response.status()).toBe(200);
      expect(body.token).toBeDefined();
      expect(body.token.length).toBeGreaterThan(0);
    });
    allure.attachment("Auth Response", JSON.stringify(body, null, 2), "application/json");
  });

  // TC-002: POST /auth - Negatif
  test('TC-API-002: Geçersiz şifre ile token isteği', async ({ request }) => {
    allure.suite("Authentication");
    const response = await request.post('/auth', {
      data: { username: 'admin', password: 'wrong_password' }
    });
    const body = await response.json();

    await test.step(`DOĞRULAMA: 'Bad credentials' mesajı alındı`, async () => {
      expect(body.reason).toBe('Bad credentials');
    });
  });

  // TC-003: GET /booking - Listeleme
  test('TC-API-003: Tüm rezervasyonları listele', async ({ request }) => {
    allure.suite("Booking");
    const start = Date.now();
    const response = await request.get('/booking');
    const duration = Date.now() - start;
    const body = await response.json();

    await test.step(`DOĞRULAMA: Dizi döner | Response Time: ${duration}ms`, async () => {
      expect(response.status()).toBe(200);
      expect(Array.isArray(body)).toBeTruthy();
      expect(duration).toBeLessThan(1000); 
    });
  });

  // TC-006: POST /booking - Oluşturma
  test('TC-API-006: Yeni rezervasyon oluştur', async ({ request }) => {
    allure.suite("Booking");
    const testData = {
      firstname: "Senior", lastname: "QA", totalprice: 100,
      depositpaid: true, bookingdates: { checkin: "2026-01-01", checkout: "2026-01-02" },
      additionalneeds: "Initial Data"
    };

    const response = await request.post('/booking', { data: testData });
    const body = await response.json();
    bookingId = body.bookingid;

    await test.step(`DOĞRULAMA: 200 OK | Yeni ID: ${bookingId}`, async () => {
      expect(response.status()).toBe(200);
      expect(body.bookingid).toBeDefined();
      expect(body.booking.firstname).toBe(testData.firstname);
    });
    allure.attachment("Created Body", JSON.stringify(body, null, 2), "application/json");
  });

  // TC-004: GET /booking/:id - Detay
  test('TC-API-004: Geçerli ID ile rezervasyon detayı', async ({ request }) => {
    allure.suite("Booking");
    const response = await request.get(`/booking/${bookingId}`);
    const body = await response.json();

    await test.step(`DOĞRULAMA: Tüm alanlar mevcut ve dolu`, async () => {
      expect(response.status()).toBe(200);
      expect(body.firstname).not.toBeNull();
      expect(body.lastname).not.toBeNull();
    });
  });

  // TC-005: GET /booking/:id - Negatif
  test('TC-API-005: Geçersiz ID ile sorgu', async ({ request }) => {
    allure.suite("Negative Scenarios");
    const response = await request.get('/booking/999999999');
    
    await test.step(`DOĞRULAMA: 404 Not Found`, async () => {
      expect(response.status()).toBe(404);
    });
  });

  // TC-007: PUT /booking/:id - GÜNCELLEME (ÖNCE-SONRA KIYASI)
  test('TC-API-007: Rezervasyon güncelle (auth)', async ({ request }) => {
    allure.suite("Booking");

    // 1. ÖNCE: Mevcut veriyi al
    const beforeRes = await request.get(`/booking/${bookingId}`);
    const beforeBody = await beforeRes.json();
    
    // 2. İŞLEM: Güncelle
    const updateRes = await request.put(`/booking/${bookingId}`, {
      headers: { 'Cookie': `token=${authToken}` },
      data: { ...beforeBody, firstname: "Master", additionalneeds: "Updated Data" }
    });
    const afterBody = await updateRes.json();

    // 3. SONRA: Karşılaştırmalı İspat
    await test.step(`KARŞILAŞTIRMA: [${beforeBody.firstname}] -> [${afterBody.firstname}] olarak güncellendi`, async () => {
      expect(updateRes.status()).toBe(200);
      expect(afterBody.firstname).toBe("Master");
      allure.attachment("Güncelleme Öncesi", JSON.stringify(beforeBody, null, 2), "application/json");
      allure.attachment("Güncelleme Sonrası", JSON.stringify(afterBody, null, 2), "application/json");
    });
  });

  // TC-009: DELETE - Negatif
  test('TC-API-009: Auth olmadan silme girişimi', async ({ request }) => {
    allure.suite("Negative Scenarios");
    const response = await request.delete(`/booking/${bookingId}`);

    await test.step(`DOĞRULAMA: 403 Forbidden`, async () => {
      expect(response.status()).toBe(403);
    });
  });

  // TC-008: DELETE - Başarılı (ÖNCE-SONRA KIYASI)
  test('TC-API-008: Rezervasyon sil (auth)', async ({ request }) => {
    allure.suite("Booking");

    // 1. İŞLEM: Sil
    const deleteRes = await request.delete(`/booking/${bookingId}`, {
      headers: { 'Cookie': `token=${authToken}` }
    });

    await test.step(`SİLME ONAYI: Status ${deleteRes.status()}`, async () => {
      expect(deleteRes.status()).toBe(201); // Restful-booker 201 döner
    });
   
    const checkRes = await request.get(`/booking/${bookingId}`);
    await test.step(`ISPAT: Silinen ID artık 404 dönüyor`, async () => {
      expect(checkRes.status()).toBe(404);
    });
  });

});