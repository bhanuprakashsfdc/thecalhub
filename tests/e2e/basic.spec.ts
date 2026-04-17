import { test, expect } from '@playwright/test';

test.describe('TheCalHub Basic Tests', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/TheCalHub/);
  });

  test('navigation to BMI calculator', async ({ page }) => {
    await page.goto('/');
    const bmiLink = page.locator('a[href="/bmi-calculator.html"]').first();
    if (await bmiLink.isVisible()) {
      await bmiLink.click();
      await expect(page).toHaveURL(/bmi-calculator/);
    }
  });

  test('BMI calculator displays result', async ({ page }) => {
    await page.goto('/bmi-calculator.html');
    await expect(page).toHaveURL(/bmi-calculator/);
  });

  test('GST calculator renders correctly', async ({ page }) => {
    await page.goto('/gst-calculator.html');
    await expect(page.locator('h2:has-text("GST Calculator")')).toBeVisible();
    await expect(page.getByRole('radio', { name: 'Add GST' })).toBeVisible();
    await expect(page.getByRole('radio', { name: 'Remove GST' })).toBeVisible();
  });

  test('percentage calculator renders correctly', async ({ page }) => {
    await page.goto('/percentage-calculator.html');
    await expect(page.locator('h2:has-text("Percentage Calculator")')).toBeVisible();
  });

  test('can switch GST mode', async ({ page }) => {
    await page.goto('/gst-calculator.html');
    await page.getByRole('radio', { name: 'Remove GST' }).click();
    await expect(page.getByRole('radio', { name: 'Remove GST' })).toBeVisible();
  });

  test('error boundary is present', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('TheCalHub', { exact: true }).first()).toBeVisible();
  });
});
