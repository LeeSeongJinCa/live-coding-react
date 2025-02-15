import { act, renderHook } from '@testing-library/react';

import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('초기값이 렌더링되어야 한다.', () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);
  });

  it('초기값을 설정할 수 있어야 한다.', () => {
    const { result } = renderHook(() => useCounter(10));

    expect(result.current.count).toBe(10);
  });

  it('값이 증가해야 한다.', () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);

    act(() => result.current.increase());

    expect(result.current.count).toBe(1);
  });

  it('값이 증가해야 한다. (2)', () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);

    act(() => result.current.increase());
    act(() => result.current.increase());

    expect(result.current.count).toBe(2);
  });

  it('값이 감소해야 한다.', () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);

    act(() => result.current.decrease());

    expect(result.current.count).toBe(-1);
  });

  it('값이 감소해야 한다. (2)', () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);

    act(() => result.current.decrease());
    act(() => result.current.decrease());

    expect(result.current.count).toBe(-2);
  });
});
