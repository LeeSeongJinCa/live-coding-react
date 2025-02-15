import test, { expect } from '@playwright/test';

const runModalTests = () => {
  test('Open 버튼을 클릭하면 모달이 열립니다.', async ({ page }) => {
    await page.locator('.open').click();
    await expect(page.locator('h1').filter({ hasText: 'Modal' })).toBeVisible();
  });

  test('Close 버튼을 클릭하면 모달이 닫힙니다.', async ({ page }) => {
    await page.locator('.open').click();
    await page.locator('.modal-content-close').click();
    await expect(page.locator('h1').filter({ hasText: 'Modal' })).not.toBeVisible();
  });

  test('모달을 중첩해서 열면 중첩된 모달이 모두 열립니다.', async ({ page }) => {
    await page.locator('.open').click();
    await expect(page.locator('h1').filter({ hasText: 'Modal' })).toBeVisible();

    await page.locator('.modal-content-open').click();
    await expect(page.locator('h1').filter({ hasText: 'Modal 2' })).toBeVisible();
  });

  test('중첩된 모달을 닫으면 중첩된 모달이 닫힙니다.', async ({ page }) => {
    await page.locator('.open').click();
    await expect(page.locator('h1').filter({ hasText: 'Modal' })).toBeVisible();

    await page.locator('.modal-content-close').click();
    await expect(page.locator('h1').filter({ hasText: 'Modal 2' })).not.toBeVisible();
  });
};

test.describe('열고 닫을 수 있고 전달된 모든 콘텐츠를 표시할 수 있는 재사용 가능한 모달 컴포넌트를 만듭니다.', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/8');
  });

  runModalTests();
});

test.describe('열고 닫을 수 있고 전달된 모든 콘텐츠를 표시할 수 있는 재사용 가능한 모달 컴포넌트를 만듭니다. (2)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/8-2');
  });

  runModalTests();
});
