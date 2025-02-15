import { expect, test } from '@playwright/test';

import { API_ROUTES } from '../src/shared/api-routes';
import { IPost } from '../src/types';

test.describe('API에서 데이터를 가져와 목록에 표시하는 컴포넌트를 만듭니다.', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/4');
  });

  test('API 데이터를 요청하기 전 로딩 상태가 표시됩니다.', async ({ page }) => {
    // 로딩 상태가 표시됩니다.
    const loader = page.getByRole('listitem').filter({ hasText: 'Loading...' });
    await expect(loader).toBeVisible();
  });

  test('API에서 데이터를 가져와 목록에 표시합니다.', async ({ page }) => {
    // API 응답을 대기합니다.
    const responsePromise = await page.waitForResponse(API_ROUTES.posts.GET);

    // 로딩 상태가 사라졌는지 확인합니다.
    const loader = page.getByRole('listitem').filter({ hasText: 'Loading...' });
    await expect(loader).not.toBeVisible();

    // API에서 데이터를 가져와 목록에 표시합니다.
    const postsLocator = await page.locator('.post-item').all();
    await expect(postsLocator.length).toBe(2);

    // API 응답 데이터를 검증합니다.
    const posts = (await responsePromise.json()) as IPost[];
    await expect(posts.length).toBe(2);
  });
});
