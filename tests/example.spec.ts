import { test, expect } from '@playwright/test';


// finding text on the page
test('homepage has header', async ({ page }) => {
  await page.goto('https://createfuture.com/');

  await expect(page.getByText('So, what are we ')).toBeVisible();
});

//click on a link
test('click link on homepage', async ({ page }) => {
  await page.goto('https://createfuture.com/');

  await page.getByText("Let's talk").click();

  await expect(page.getByText("Let's talk action")).toBeVisible();
});
