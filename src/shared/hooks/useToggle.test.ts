import { act, renderHook } from '@testing-library/react';

import { useToggle } from './useToggle';

describe('useToggle', () => {
  it('초기값이 렌더링되어야 한다.', () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current.value).toBe(false);
  });

  it('초기값을 설정할 수 있어야 한다.', () => {
    const { result } = renderHook(() => useToggle(true));

    expect(result.current.value).toBe(true);

    act(() => result.current.toggle());

    expect(result.current.value).toBe(false);
  });

  it('값이 토글되어야 한다.', () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current.value).toBe(false);

    act(() => result.current.toggle());

    expect(result.current.value).toBe(true);
  });

  it('값이 토글되어야 한다. (2)', () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current.value).toBe(false);

    act(() => result.current.toggle());
    act(() => result.current.toggle());

    expect(result.current.value).toBe(false);
  });

  it('값이 토글되어야 한다. (3)', () => {
    const { result } = renderHook(() => useToggle(true));

    expect(result.current.value).toBe(true);

    act(() => result.current.toggle());
    act(() => result.current.toggle());

    expect(result.current.value).toBe(true);
  });
});
