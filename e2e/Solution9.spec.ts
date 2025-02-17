import test, { expect, Page } from '@playwright/test';

const timeoutInS = 3;
const timeoutInMS = timeoutInS * 1000;
const buffer = 500;

const visibleFirstImage = async (page: Page) => {
  await expect(page.locator('.image').nth(0)).toBeInViewport({
    timeout: timeoutInS,
    ratio: 0.8, // 80% 이상 보여야 통과
  });
  await expect(page.locator('.image').nth(1)).not.toBeInViewport({
    timeout: timeoutInS,
    ratio: 0.5, // Timeout을 고려하여 20% 이하 보여야 통과
  });
  await expect(page.locator('.image').nth(2)).not.toBeInViewport({
    timeout: timeoutInS,
    ratio: 0, // 절대 보여지면 안됨
  });
};

const visibleSecondImage = async (page: Page) => {
  await expect(page.locator('.image').nth(0)).not.toBeInViewport({
    timeout: timeoutInS,
    ratio: 0.5,
  });
  await expect(page.locator('.image').nth(1)).toBeInViewport({
    timeout: timeoutInS,
    ratio: 0.8,
  });
  await expect(page.locator('.image').nth(2)).not.toBeInViewport({
    timeout: timeoutInS,
    ratio: 0.5,
  });
};

const visibleThirdImage = async (page: Page) => {
  await expect(page.locator('.image').nth(0)).not.toBeInViewport({
    timeout: timeoutInS,
    ratio: 0,
  });
  await expect(page.locator('.image').nth(1)).not.toBeInViewport({
    timeout: timeoutInS,
    ratio: 0.5,
  });
  await expect(page.locator('.image').nth(2)).toBeInViewport({
    timeout: timeoutInS,
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
    test.setTimeout(timeoutInMS + buffer);

    // 캐러셀이 첫 번째 이미지를 보여줘야 합니다.
    await visibleFirstImage(page);
  });

  test('1초 후에 캐러셀이 두 번째 이미지를 보여줍니다.', async ({ page }) => {
    // 이 테스트는 2초 이내에 완료되어야 합니다.
    test.setTimeout(timeoutInMS * 2 + buffer);

    // 1초 후에
    await page.waitForTimeout(timeoutInMS * 1);

    // 캐러셀이 두 번째 이미지를 보여줘야 합니다.
    await visibleSecondImage(page);
  });

  test('2초 후에 캐러셀이 세 번째 이미지를 보여줍니다.', async ({ page }) => {
    // 이 테스트는 3초 이내에 완료되어야 합니다.
    test.setTimeout(timeoutInMS * 3 + buffer);

    // 2초 후에
    await page.waitForTimeout(timeoutInMS * 2);

    // 캐러셀이 세 번째 이미지를 보여줘야 합니다.
    await visibleThirdImage(page);
  });

  test('3초 후에 캐러셀이 다시 첫 번째 이미지를 보여줍니다.', async ({ page }) => {
    // 이 테스트는 4초 이내에 완료되어야 합니다.
    test.setTimeout(timeoutInMS * 4 + buffer);

    // 3초 후에
    await page.waitForTimeout(timeoutInMS * 3);

    // 캐러셀이 다시 첫 번째 이미지를 보여줘야 합니다.
    await visibleFirstImage(page);
  });

  test('첫번째 페이지네이션을 클릭하면 첫번째 이미지로 이동합니다.', async ({ page }) => {
    // 이 테스트는 1초 이내에 완료되어야 합니다.
    test.setTimeout(timeoutInMS + buffer);

    // 첫번째 페이지네이션을 클릭하면
    await page.locator('.pagination').nth(0).click();

    // transform 속성이 적용되는 시간을 고려하여 350ms 대기
    await page.waitForTimeout(350);

    // 첫번째 이미지로 이동합니다.
    await visibleFirstImage(page);
  });

  test('두번째 페이지네이션을 클릭하면 두번째 이미지로 이동합니다.', async ({ page }) => {
    // 이 테스트는 1초 이내에 완료되어야 합니다.
    test.setTimeout(timeoutInMS + buffer);

    // 두번째 페이지네이션을 클릭하면
    await page.locator('.pagination').nth(1).click();

    // transform 속성이 적용되는 시간을 고려하여 350ms 대기
    await page.waitForTimeout(350);

    // 두번째 이미지로 이동합니다.
    await visibleSecondImage(page);
  });

  test('세번째 페이지네이션을 클릭하면 세번째 이미지로 이동합니다.', async ({ page }) => {
    // 이 테스트는 1초 이내에 완료되어야 합니다.
    test.setTimeout(timeoutInMS + buffer);

    // 세번째 페이지네이션을 클릭하면
    await page.locator('.pagination').nth(2).click();

    // transform 속성이 적용되는 시간을 고려하여 350ms 대기
    await page.waitForTimeout(350);

    // 세번째 이미지로 이동합니다.
    await visibleThirdImage(page);
  });

  test('이전 버튼을 클릭하면 이전 이미지로 이동합니다.', async ({ page }) => {
    // 이 테스트는 1초 이내에 완료되어야 합니다.
    test.setTimeout(timeoutInMS + buffer);

    // 이전 버튼을 클릭하면
    await page.locator('.carousel-navigation-button-prev').first().click();

    // transform 속성이 적용되는 시간을 고려하여 350ms 대기
    await page.waitForTimeout(350);

    // 이전 이미지로 이동합니다.
    await visibleThirdImage(page);
  });

  test('다음 버튼을 클릭하면 다음 이미지로 이동합니다.', async ({ page }) => {
    // 이 테스트는 1초 이내에 완료되어야 합니다.
    test.setTimeout(timeoutInMS + buffer);

    // 다음 버튼을 클릭하면
    await page.locator('.carousel-navigation-button-next').first().click();

    // transform 속성이 적용되는 시간을 고려하여 350ms 대기
    await page.waitForTimeout(350);

    // 다음 이미지로 이동합니다.
    await visibleSecondImage(page);
  });
});
