import test, { expect } from '@playwright/test';

test.describe('Solution 10. Implement a Rating Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/10');
    await page.waitForTimeout(1000);
  });

  test('페이지 접속 시 0점이어야 한다.', async ({ page }) => {
    await expect(page.locator('.rating-star-active')).toHaveCount(0);
  });

  test('1점 선택 시 1개까지 활성화 되어야 한다..', async ({ page }) => {
    await page.locator('.rating-star').nth(0).click();
    await expect(page.locator('.rating-star-active')).toHaveCount(1);
  });

  test('5점 선택 시 5개의 별이 활성화 되어야 한다.', async ({ page }) => {
    await page.locator('.rating-star').nth(4).click();
    await expect(page.locator('.rating-star-active')).toHaveCount(5);
  });
});
