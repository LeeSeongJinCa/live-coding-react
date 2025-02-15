import test, { expect } from '@playwright/test';

test.describe('Solution 6. Build a Dropdown Menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/6');
  });

  test('페이지 접속 시 Open 버튼이 보여야 합니다.', async ({ page }) => {
    await expect(page.locator('button').filter({ hasText: 'Open' })).toBeVisible();
  });

  test('페이지 접속 시 메뉴가 표시되지 않아야 합니다.', async ({ page }) => {
    await expect(page.locator('.menu')).not.toBeVisible();
  });

  test('Open 버튼을 클릭하면 메뉴가 표시되어야 합니다.', async ({ page }) => {
    await page.locator('button').filter({ hasText: 'Open' }).click();
    await expect(page.locator('.menu')).toBeVisible();
  });

  test('Close 버튼을 클릭하면 메뉴가 사라져야 합니다.', async ({ page }) => {
    await page.locator('button').filter({ hasText: 'Open' }).click();
    await page.locator('button').filter({ hasText: 'Close' }).click();
    await expect(page.locator('.menu')).not.toBeVisible();
  });

  test('메뉴 아이템을 클릭하면 메뉴가 사라져야 합니다.', async ({ page }) => {
    await page.locator('button').filter({ hasText: 'Open' }).click();
    await page.locator('.menu-item').filter({ hasText: '1' }).click();
    await expect(page.locator('.menu')).not.toBeVisible();
  });
});
