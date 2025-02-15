import { expect, test } from '@playwright/test';

test.describe('Solution 1. Create a Counter Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/1');
  });

  test('증가 버튼을 클릭하면 카운트가 늘어납니다.', async ({ page }) => {
    // 증가 버튼을 클릭하면
    await page.locator('button[id="increase"]').click();

    // 카운트가 늘어납니다.
    await expect(
      page.locator('span[id="count"]').getByText('1', { exact: true }),
    ).toHaveText('1');
  });

  test('감소 버튼을 클릭하면 카운트가 줄어듭니다.', async ({ page }) => {
    // 증가 버튼을 클릭하면
    await page.locator('button[id="decrease"]').click();

    // 카운트가 늘어납니다.
    await expect(
      page.locator('span[id="count"]').getByText('-1', { exact: true }),
    ).toHaveText('-1');
  });
});
