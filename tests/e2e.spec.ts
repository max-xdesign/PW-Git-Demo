import { test, expect } from '@playwright/test';

//Note: chose getByRole or getByText as no IDS available for most tests

// finding text on the home page
test('homepage has header', async ({ page }) => {
  await page.goto('https://createfuture.com/');
  await expect(page.getByText('So, what are we ')).toBeVisible();
});

//click on a link to arrive at contact page
test('click link on homepage', async ({ page }) => {
  await page.goto('https://createfuture.com/');
  await page.getByRole('button', { name: 'link-as-button midnight'}).click
  await expect(page.getByText('Get in touch')).toBeVisible();
});

//find a missing image on the about page without alt text
// - no other locator options were available for this image
test('check background image', async ({ page }) => {
  await page.goto('https://createfuture.com/about/');
  const aboutImage = page.locator('.background-image')
  await expect(aboutImage).toBeVisible();
});


//test dropdown elements to visit Services Page
test('Dropdown navigation test', async ({ page }) => {
  await page.goto('https://createfuture.com/');
  await page.getByRole('menuitem', { name: 'Our Services'}).hover();
  await page.getByRole('menuitem', { name: 'Data & AI' }).click();
  await expect(page.getByRole('heading').getByText('Data and AI', { exact: true})).toBeVisible();
});

//find an image on a case study using alt text
test('find image by alt text', async ({ page }) => {
  await page.goto('https://createfuture.com/');
  await page.getByRole('menuitem', { name: 'our experience'}).hover();
  await page.getByRole('menuitem', { name: 'adidas' }).click();
  await expect(page.getByAltText('ADDSCS_user_testing')).toBeVisible();
});

//negative test of contact fields
// - used iframe as the other locator methods would not find the element without first being inside the content frame
test('incomplete contact form entry', async ({ page }) => {
  await page.goto('https://createfuture.com/contact/');
  await page.locator('iframe[title="Form 0"]').contentFrame().getByPlaceholder('First name', { exact: true }).click();
  await page.locator('iframe[title="Form 0"]').contentFrame().getByPlaceholder('First name', { exact: true }).fill('max');
  await page.locator('iframe[title="Form 0"]').contentFrame().getByRole('button', { name: 'Send your message' }).click();
  await expect(page.locator('iframe[title="Form 0"]').contentFrame().getByText('Please complete all required')).toBeVisible();
});

