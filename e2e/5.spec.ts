import { expect, test } from '@playwright/test';

import { API_ROUTES } from '../src/shared/api-routes';
import { IComment } from '../src/types';

test.describe(
  '사용자가 입력하는 대로 항목 목록을 필터링하는 검색창 컴포넌트를 만듭니다.',
  () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:3000/5');
    });

    test('API에서 데이터를 가져와 목록에 표시합니다.', async ({ page }) => {
      // API 응답을 대기합니다.
      const responsePromise = await page.waitForResponse(API_ROUTES.comments.GET);

      // 로딩 상태가 사라졌는지 확인합니다.
      const loader = page.getByRole('listitem').filter({ hasText: 'Loading...' });
      await expect(loader).not.toBeVisible();

      // API에서 데이터를 가져와 목록에 표시합니다.
      const commentsLoader = await page.locator('.comment-item').all();
      await expect(commentsLoader).toHaveLength(10);

      // API 응답 데이터를 검증합니다.
      const comments = (await responsePromise.json()) as IComment[];
      await expect(comments).toHaveLength(10);
    });

    test('사용자가 존재하는 이름을 입력하면 항목 목록이 해당 이름으로 필터링됩니다.', async ({
      page,
    }) => {
      // API 응답을 대기합니다.
      const responsePromise = await page.waitForResponse(API_ROUTES.comments.GET);

      // 로딩 상태가 사라졌는지 확인합니다.
      const loader = page.getByRole('listitem').filter({ hasText: 'Loading...' });
      await expect(loader).not.toBeVisible();

      // API에서 데이터를 가져와 목록에 표시합니다.
      const commentsLoader = await page.locator('.comment-item').all();
      await expect(commentsLoader).toHaveLength(10);

      // API 응답 데이터를 검증합니다.
      const comments = (await responsePromise.json()) as IComment[];
      await expect(comments).toHaveLength(10);

      const search = 'Name 1';
      const regex = new RegExp(`(${search})`, 'ig');

      // 사용자가 존재하는 이름을 입력하면
      await page.locator('input[id="search-input"]').fill(search);

      // 항목 목록이 해당 이름으로 필터링됩니다.
      await expect(
        (
          await page.getByRole('listitem').filter({ hasText: regex }).all()
        ).length,
      ).toBe(comments.filter((comment) => regex.test(comment.name)).length);
    });
  },
);
