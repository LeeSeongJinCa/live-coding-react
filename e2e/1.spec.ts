import { expect, test } from '@playwright/test';

test.describe('버튼을 클릭할 때 카운트를 늘리거나 줄이는 간단한 카운터 컴포넌트를 만듭니다.', () => {
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
