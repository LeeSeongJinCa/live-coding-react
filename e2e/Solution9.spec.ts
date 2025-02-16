import test, { expect, Page } from '@playwright/test';

const visibleFirstImage = async (page: Page) => {
  await expect(page.locator('.image').nth(0)).toBeInViewport({
    timeout: 1,
    ratio: 0.8, // 80% 이상 보여야 통과
  });
  await expect(page.locator('.image').nth(1)).not.toBeInViewport({
    timeout: 1,
    ratio: 0.5, // Timeout을 고려하여 20% 이하 보여야 통과
  });
  await expect(page.locator('.image').nth(2)).not.toBeInViewport({
    timeout: 1,
    ratio: 0, // 절대 보여지면 안됨
  });
};

const visibleSecondImage = async (page: Page) => {
  await expect(page.locator('.image').nth(0)).not.toBeInViewport({
    timeout: 1,
    ratio: 0.5,
  });
  await expect(page.locator('.image').nth(1)).toBeInViewport({
    timeout: 1,
    ratio: 0.8,
  });
  await expect(page.locator('.image').nth(2)).not.toBeInViewport({
    timeout: 1,
    ratio: 0.5,
  });
};

const visibleThirdImage = async (page: Page) => {
  await expect(page.locator('.image').nth(0)).not.toBeInViewport({
    timeout: 1,
    ratio: 0,
  });
  await expect(page.locator('.image').nth(1)).not.toBeInViewport({
    timeout: 1,
    ratio: 0.5,
  });
  await expect(page.locator('.image').nth(2)).toBeInViewport({
    timeout: 1,
    ratio: 0.8,
  });
};

test.describe('Solution 9. Build a Carousel Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/9');

    // 이미지 로드 대기
    await (await page.waitForResponse(/^https:\/\/placehold\.co/)).finished();
  });

  test('페이지 접속 시 캐러셀이 첫 번째 이미지를 보여줍니다.', async ({ page }) => {
    // 이 테스트는 1초 이내에 완료되어야 합니다.
    test.setTimeout(1500);

    // 캐러셀이 첫 번째 이미지를 보여줘야 합니다.
    await visibleFirstImage(page);
  });

  test('1초 후에 캐러셀이 두 번째 이미지를 보여줍니다.', async ({ page }) => {
    // 이 테스트는 2초 이내에 완료되어야 합니다.
    test.setTimeout(2500);

    // 1초 후에
    await page.waitForTimeout(1000);

    // 캐러셀이 두 번째 이미지를 보여줘야 합니다.
    await visibleSecondImage(page);
  });

  test('2초 후에 캐러셀이 세 번째 이미지를 보여줍니다.', async ({ page }) => {
    // 이 테스트는 3초 이내에 완료되어야 합니다.
    test.setTimeout(3500);

    // 2초 후에
    await page.waitForTimeout(2000);

    // 캐러셀이 세 번째 이미지를 보여줘야 합니다.
    await visibleThirdImage(page);
  });

  test('3초 후에 캐러셀이 다시 첫 번째 이미지를 보여줍니다.', async ({ page }) => {
    // 이 테스트는 4초 이내에 완료되어야 합니다.
    test.setTimeout(4500);

    // 3초 후에
    await page.waitForTimeout(3000);

    // 캐러셀이 다시 첫 번째 이미지를 보여줘야 합니다.
    await visibleFirstImage(page);
  });

  test('첫번째 페이지네이션을 클릭하면 첫번째 이미지로 이동합니다.', async ({ page }) => {
    // 첫번째 페이지네이션을 클릭하면
    await page.locator('.pagination').nth(0).click();

    // transform 속성이 적용되는 시간을 고려하여 350ms 대기
    await page.waitForTimeout(350);

    // 첫번째 이미지로 이동합니다.
    await visibleFirstImage(page);
  });

  test('두번째 페이지네이션을 클릭하면 두번째 이미지로 이동합니다.', async ({ page }) => {
    // 두번째 페이지네이션을 클릭하면
    await page.locator('.pagination').nth(1).click();

    // transform 속성이 적용되는 시간을 고려하여 350ms 대기
    await page.waitForTimeout(350);

    // 두번째 이미지로 이동합니다.
    await visibleSecondImage(page);
  });

  test('세번째 페이지네이션을 클릭하면 세번째 이미지로 이동합니다.', async ({ page }) => {
    // 세번째 페이지네이션을 클릭하면
    await page.locator('.pagination').nth(2).click();

    // transform 속성이 적용되는 시간을 고려하여 350ms 대기
    await page.waitForTimeout(350);

    // 세번째 이미지로 이동합니다.
    await visibleThirdImage(page);
  });
});
