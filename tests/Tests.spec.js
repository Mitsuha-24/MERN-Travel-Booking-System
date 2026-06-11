import { test, expect } from '@playwright/test';

test('test site is accessible', async ({ page }) => {
  // 1. Fixed: Changed page1 to page
  await page.goto('http://localhost:3000');

});

test('test hotel booking flow', async ({ page }) => {

  await page.goto('http://localhost:3000');

  // Start waiting for popup before clicking the link
  const page2Promise  = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Hotel Booking' }).click();
  const page2 = await page2Promise;//  for the new page to load
   await page2.goto('http://localhost:3000/hotels'); // Wait for the new page to load
  await page2.getByRole('link', { name: 'Book Now' }).first().click();
  
  await page2.goto('http://localhost:3000/hotelbooking?hotelName=The%20Grand%20Waterfront%20Resort'); // Wait for the booking page to load
  await page2.getByRole('textbox', { name: 'Guest Name:' }).fill('test user');
  await page2.getByRole('textbox', { name: 'Email:' }).fill('test@gmail.com');
  await page2.getByRole('textbox', { name: 'Phone Number:' }).fill('1234569870');
  await page2.getByRole('textbox', { name: 'Check-in Date:' }).fill('0001-02-11');
  await page2.getByRole('textbox', { name: 'Check-out Date:' }).fill('2001-11-11');
  await page2.getByRole('spinbutton', { name: 'Credit/Debit Card Number:' }).fill('9874561230789456');
  await page2.getByRole('textbox', { name: 'Expiry Date:' }).fill('2025-12-11');
  
  await page2.getByRole('button', { name: 'Submit Booking' }).click();
  
   await expect(page2.getByText('Booking Successful!')).toBeVisible();
});