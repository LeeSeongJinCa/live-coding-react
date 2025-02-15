import test, { expect } from '@playwright/test';

test.describe(
  '탭을 선택하면 각 탭에 다른 콘텐츠가 표시되는 탭 컴포넌트를 만듭니다.',
  () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:3000/7');
    });

    test('탭 버튼이 표시됩니다.', async ({ page }) => {
      await expect(page.locator('.tab-button').first()).toBeVisible();
    });

    test('탭을 선택하면 탭 콘텐츠가 표시됩니다. (1)', async ({ page }) => {
      await page.locator('.tab-button').nth(0).click();
      await expect(page.locator('.tab-content')).toHaveText('This is First Content');
    });

    test('탭을 선택하면 탭 콘텐츠가 표시됩니다. (2)', async ({ page }) => {
      await page.locator('.tab-button').nth(1).click();
      await expect(page.locator('.tab-content')).toHaveText('This is Second Content');
    });

    test('탭을 선택하면 탭 콘텐츠가 표시됩니다. (3)', async ({ page }) => {
      await page.locator('.tab-button').nth(2).click();
      await expect(page.locator('.tab-content')).toHaveText('This is Third Content');
    });
  },
);
