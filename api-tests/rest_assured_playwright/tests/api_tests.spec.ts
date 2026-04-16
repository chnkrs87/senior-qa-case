import { test, expect } from '@playwright/test';
import { allure } from "allure-playwright";

let authToken: string;
let bookingId: number;

test.describe('Senior QA Engineer - API Case Study', () => {

  test('TC-API-001: Geçerli kullanici ile token al', async ({ request }) => {
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

  test('TC-API-002: Geçersiz şifre ile token isteği', async ({ request }) => {
    allure.suite("Authentication");
    const response = await request.post('/auth', {
      data: { username: 'admin', password: 'wrong_password' }
    });
    const body = await response.json();

    await test.step(`DOĞRULAMA: 'Bad credentials' mesaji alindi`, async () => {
      expect(body.reason).toBe('Bad credentials');
    });
  });

  test('TC-API-003: Tüm rezervasyonlari listele', async ({ request }) => {
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

  test('TC-API-004: Geçerli ID ile rezervasyon detayi', async ({ request }) => {
    allure.suite("Booking");
    const response = await request.get(`/booking/${bookingId}`);
    const body = await response.json();

    await test.step(`DOĞRULAMA: Tüm alanlar mevcut ve dolu`, async () => {
      expect(response.status()).toBe(200);
      expect(body.firstname).not.toBeNull();
      expect(body.lastname).not.toBeNull();
    });
  });

  test('TC-API-005: Geçersiz ID ile sorgu', async ({ request }) => {
    allure.suite("Negative Scenarios");
    const response = await request.get('/booking/999999999');
    
    await test.step(`DOĞRULAMA: 404 Not Found`, async () => {
      expect(response.status()).toBe(404);
    });
  });

  test('TC-API-007: Rezervasyon güncelle (auth)', async ({ request }) => {
    allure.suite("Booking");

    const beforeRes = await request.get(`/booking/${bookingId}`);
    const beforeBody = await beforeRes.json();
    
    const updateRes = await request.put(`/booking/${bookingId}`, {
      headers: { 'Cookie': `token=${authToken}` },
      data: { ...beforeBody, firstname: "Master", additionalneeds: "Updated Data" }
    });
    const afterBody = await updateRes.json();

    await test.step(`KARŞILAŞTIRMA: [${beforeBody.firstname}] -> [${afterBody.firstname}] olarak güncellendi`, async () => {
      expect(updateRes.status()).toBe(200);
      expect(afterBody.firstname).toBe("Master");
      allure.attachment("Güncelleme Öncesi", JSON.stringify(beforeBody, null, 2), "application/json");
      allure.attachment("Güncelleme Sonrasi", JSON.stringify(afterBody, null, 2), "application/json");
    });
  });

  test('TC-API-009: Auth olmadan silme girişimi', async ({ request }) => {
    allure.suite("Negative Scenarios");
    const response = await request.delete(`/booking/${bookingId}`);

    await test.step(`DOĞRULAMA: 403 Forbidden`, async () => {
      expect(response.status()).toBe(403);
    });
  });

  test('TC-API-008: Rezervasyon sil (auth)', async ({ request }) => {
    allure.suite("Booking");

    const deleteRes = await request.delete(`/booking/${bookingId}`, {
      headers: { 'Cookie': `token=${authToken}` }
    });

    await test.step(`SİLME ONAYI: Status ${deleteRes.status()}`, async () => {
      expect(deleteRes.status()).toBe(201); 
    });
   
    const checkRes = await request.get(`/booking/${bookingId}`);
    await test.step(`ISPAT: Silinen ID artik 404 dönüyor`, async () => {
      expect(checkRes.status()).toBe(404);
    });
  });

});