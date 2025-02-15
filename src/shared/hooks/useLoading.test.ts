import { act, renderHook } from '@testing-library/react';

import { delay } from '../utils/delay';
import { useLoading } from './useLoading';

describe('useLoading', () => {
  it('초기값이 렌더링되어야 한다.', () => {
    const { result } = renderHook(() => useLoading());

    expect(result.current.isLoading).toBe(false);
  });

  it('startLoading 함수를 호출하면 isLoading이 true로 변경되어야 한다.', () => {
    const { result } = renderHook(() => useLoading());

    act(() => result.current.startLoading());

    expect(result.current.isLoading).toBe(true);
  });

  it('stopLoading 함수를 호출하면 isLoading이 false로 변경되어야 한다.', () => {
    const { result } = renderHook(() => useLoading());

    act(() => result.current.stopLoading());

    expect(result.current.isLoading).toBe(false);
  });

  it('startLoading 함수를 호출하고 3초 뒤에 stopLoading 함수를 호출하면 isLoading이 false로 변경되어야 한다.', async () => {
    const { result } = renderHook(() => useLoading());

    act(() => result.current.startLoading());

    expect(result.current.isLoading).toBe(true);

    await delay(3000);

    act(() => result.current.stopLoading());

    expect(result.current.isLoading).toBe(false);
  });

  it('초기값을 true로 설정할 수 있어야 한다.', () => {
    const { result } = renderHook(() => useLoading(true));

    expect(result.current.isLoading).toBe(true);
  });

  it('초기값이 true일 때 stopLoading 함수를 호출하면 isLoading이 false로 변경되어야 한다.', () => {
    const { result } = renderHook(() => useLoading(true));

    act(() => result.current.stopLoading());

    expect(result.current.isLoading).toBe(false);
  });

  it('초기값이 true일 때 startLoading 함수를 호출해도 isLoading은 true를 유지해야 한다.', () => {
    const { result } = renderHook(() => useLoading(true));

    act(() => result.current.startLoading());

    expect(result.current.isLoading).toBe(true);
  });
});
