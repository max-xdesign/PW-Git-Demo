import { test, expect } from '@playwright/test';

//Note: chose text as no IDS

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
test('check background image', async ({ page }) => {
  await page.goto('https://createfuture.com/about/');

  const aboutImage = page.locator('.background-image')

  await expect(aboutImage).toBeVisible();
});


//test dropdown elements to visit Services Page
test('Dropdown navigation test', async ({ page }) => {
  await page.goto('https://createfuture.com/');
  await page.getByRole('link', { name: 'Our Services'}).hover();
  await page.getByRole('link', { name: 'Data and AI' }).click();
  await expect(page.getByText('Data and AI')).toBeVisible;
});

//find an image on a case study using alt text
test('find image by alt text', async ({ page }) => {
  await page.goto('https://createfuture.com/');
  await page.getByRole('link', { name: 'Our Experience'}).hover();
  await page.getByRole('link', { name: 'adidas' }).click();
  await expect(page.getByAltText('Adidas user testing')).toBeVisible;
});

//negative test of contact fields
//cover why i have used iframe locator
test('incomplete contact', async ({ page }) => {
  await page.goto('https://createfuture.com/contact/');
  await page.locator('iframe[title="Form 0"]').contentFrame().getByPlaceholder('First name', { exact: true }).click();
  await page.locator('iframe[title="Form 0"]').contentFrame().getByPlaceholder('First name', { exact: true }).fill('max');
  await page.getByRole('button', { name: 'hs-button primary'}).click;
  await expect(page.getByText('Please complete all required fields.')).toBeVisible;
});

