import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page1.goto('http://localhost:3000/hotels');
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Hotel Booking' }).click();
  const page2 = await page2Promise;
  await page2.getByRole('link', { name: 'Book Now' }).first().click();
  await page2.getByRole('textbox', { name: 'Guest Name:' }).click();
  await page2.getByRole('textbox', { name: 'Guest Name:' }).fill('asd');
  await page2.getByRole('textbox', { name: 'Email:' }).click();
  await page2.getByRole('textbox', { name: 'Email:' }).fill('pkg@gmail.com');
  await page2.getByRole('textbox', { name: 'Phone Number:' }).click();
  await page2.getByRole('textbox', { name: 'Phone Number:' }).fill('1234569870');
  await page2.getByRole('textbox', { name: 'Check-in Date:' }).fill('0001-02-11');
  await page2.getByRole('textbox', { name: 'Check-out Date:' }).fill('2001-11-11');
  await page2.getByRole('spinbutton', { name: 'Credit/Debit Card Number:' }).click();
  await page2.getByRole('spinbutton', { name: 'Credit/Debit Card Number:' }).fill('9874561230789456');
  await page2.getByRole('textbox', { name: 'Expiry Date:' }).fill('2025-12-11');
  await page2.getByRole('button', { name: 'Submit Booking' }).click();
  //await page2.tohave
});