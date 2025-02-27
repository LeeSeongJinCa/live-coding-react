import { delay } from './delay';

// Fake Timer를 사용하기 위해 필요한 설정
jest.useFakeTimers();

describe('delay', () => {
  it('delay 함수에 1000ms를 전달하면 1000ms 뒤에 함수가 호출되어야 한다.', async () => {
    const fn = jest.fn();

    delay(1000).then(fn);

    // 1000ms 전에 호출되지 않아야 한다.
    expect(fn).not.toHaveBeenCalled();

    // 가짜 타이머를 1000ms 앞으로 이동
    jest.advanceTimersByTime(1000);

    // Promise가 resolve될 시간을 주기 위해 다음 이벤트 루프까지 기다림
    await Promise.resolve();

    // 1000ms 후에 호출되어야 한다.
    expect(fn).toHaveBeenCalled();
  });
});

// 테스트 종료 후 실제 Timer를 사용하도록 설정
afterEach(() => {
  jest.useRealTimers();
});
