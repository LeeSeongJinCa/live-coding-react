import { expect, test } from '@playwright/test';

test.describe('Solution 3. Build a To-Do List', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/3');
  });

  test('페이지에 접속하면 기본 투두가 1개 존재합니다.', async ({ page }) => {
    await page.waitForSelector('.todo-item');

    // 기본 투두가
    const todos = await page.locator('.todo-item').all();

    // 1개 존재합니다.
    expect(todos.length).toBe(1);
  });

  test('input에 텍스트를 1개 이상 입력하고 + 버튼을 클릭해서 투두를 추가할 수 있습니다.', async ({
    page,
  }) => {
    // input에 텍스트를 1개 이상 입력하고
    await page.locator('input[id="text-input"]').fill('Todo 1');

    // + 버튼을 클릭해서
    await page.locator('button[id="add-button"]').click();

    // 투두를 추가할 수 있습니다.
    const todos = await page.locator('.todo-item').all();

    expect(todos.length).toBe(2);

    // 마지막 투두의 제목이 입력한 제목과 일치해야합니다.
    await expect(page.locator('p[id="todo-text"]').last()).toHaveText('Todo 1');
  });

  test('x 버튼을 클릭해서 투두를 삭제할 수 있습니다.', async ({ page }) => {
    // x 버튼을 클릭해서
    await page.locator('button[id="todo-remove"]').click();

    // 투두를 삭제할 수 있습니다.
    const todos = await page.locator('.todo-item').all();

    expect(todos.length).toBe(0);
  });

  test('checkbox를 클릭해서 투두를 완료할 수 있습니다.', async ({ page }) => {
    // checkbox를 클릭해서
    await page.locator('input[id="todo-completed"]').click();

    // 투두를 완료할 수 있습니다.
    expect(await page.locator('input[id="todo-completed"]').isChecked()).toBe(true);
  });
});
