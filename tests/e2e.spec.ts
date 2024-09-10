import { test, expect } from '@playwright/test';


// finding text on the page
test('homepage has header', async ({ page }) => {
  await page.goto('https://createfuture.com/');

  await expect(page.getByText('So, what are we ')).toBeVisible();
});

//click on a link
test('click link on homepage', async ({ page }) => {
  await page.goto('https://createfuture.com/');

  await page.getByRole('button', { name: 'link-as-button midnight'}).click

  await expect(page.getByText('Get in touch')).toBeVisible();
});

//find an image
test('check background image', async ({ page }) => {
  await page.goto('https://createfuture.com/about/');

  const aboutImage = page.locator('.background-image')

  await expect(aboutImage).toBeVisible();
});