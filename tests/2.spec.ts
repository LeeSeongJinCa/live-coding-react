import { expect, Page, test } from '@playwright/test';

test.describe("'켜기'와 '끄기' 상태 사이의 토글 스위치 컴포넌트를 만듭니다.", () => {
  const OffToOn = async (page: Page) => {
    // Off 상태의 스위치에서
    await expect(page.locator('span[id="status"]')).toHaveText('Off');

    // 토글 버튼을 클릭하면
    await page.locator('button[id="toggle"]').click();

    // 스위치가 On 됩니다.
    await expect(page.locator('span[id="status"]')).toHaveText('On');
  };

  const OnToOff = async (page: Page) => {
    // On 상태의 스위치에서
    await expect(page.locator('span[id="status"]')).toHaveText('On');

    // 토글 버튼을 클릭하면
    await page.locator('button[id="toggle"]').click();

    // 스위치가 Off 됩니다.
    await expect(page.locator('span[id="status"]')).toHaveText('Off');
  };

  test('Off 상태의 스위치에서 토글 버튼을 클릭하면 스위치가 On 됩니다.', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/2');

    await OffToOn(page);
  });

  test('On 상태의 스위치에서 토글 버튼을 클릭하면 스위치가 Off 됩니다.', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/2');

    await OffToOn(page);

    await OnToOff(page);
  });
});
