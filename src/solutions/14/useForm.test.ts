import { act, renderHook } from '@testing-library/react';

import { useForm } from './useForm';

describe('useForm', () => {
  // 기본 테스트용 값들
  const defaultValues = {
    name: '',
    email: '',
  } as const;

  // 유효성 검사 함수
  const validators = {
    name: (value: string) => value.length >= 3,
    email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  } as const;

  it('초기 상태가 defaultValues로 설정되어야 한다.', () => {
    const { result } = renderHook(() => useForm({ defaultValues, validators }));

    // values 초기값 확인
    expect(result.current.values.name).toBe('');
    expect(result.current.values.email).toBe('');
  });

  it('초기 유효성 검사 결과가 올바르게 설정되어야 한다.', () => {
    const { result } = renderHook(() => useForm({ defaultValues, validators }));

    // 유효성 검사 확인
    expect(result.current.errors.name).toBe('Invalid value for name');
    expect(result.current.errors.email).toBe('Invalid value for email');
  });

  it('입력값 변경 시 상태가 올바르게 업데이트되어야 한다.', () => {
    const { result } = renderHook(() => useForm({ defaultValues, validators }));

    // name 필드 변경
    act(() => {
      const nameChangeEvent = {
        target: { name: 'name', value: 'John' },
      } as React.ChangeEvent<HTMLInputElement>;

      result.current.register('name').onChange(nameChangeEvent);
    });

    // 업데이트된 값 확인
    expect(result.current.register('name').value).toBe('John');
    expect(result.current.register('name').error).toBeUndefined();

    // 유효하지 않은 이메일 입력
    act(() => {
      const emailChangeEvent = {
        target: { name: 'email', value: 'invalid-email' },
      } as React.ChangeEvent<HTMLInputElement>;

      result.current.register('email').onChange(emailChangeEvent);
    });

    // 에러 메시지 확인
    expect(result.current.register('email').value).toBe('invalid-email');
    expect(result.current.register('email').error).toBe(`Invalid value for ${'email'}`);
  });

  it('유효하지 않은 폼 제출 시 콜백함수가 실행되지 않아야 한다.', () => {
    const { result } = renderHook(() => useForm({ defaultValues, validators }));
    const mockSubmitCallback = jest.fn();
    const mockPreventDefault = jest.fn();

    // 유효하지 않은 상태로 제출 시도
    expect(() => {
      const handleSubmit = result.current.handleSubmit(mockSubmitCallback);
      handleSubmit({
        preventDefault: mockPreventDefault,
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    // 콜백이 호출되지 않아야 함
    expect(mockSubmitCallback).not.toHaveBeenCalled();
  });

  it('유효한 폼 제출 시 콜백이 호출되어야 한다.', () => {
    const { result } = renderHook(() => useForm({ defaultValues, validators }));
    const mockSubmitCallback = jest.fn();
    const mockPreventDefault = jest.fn();

    // 유효한 값으로 필드 설정
    act(() => {
      const nameChangeEvent = {
        target: { name: 'name', value: 'John' },
      } as React.ChangeEvent<HTMLInputElement>;

      result.current.register('name').onChange(nameChangeEvent);
    });

    act(() => {
      const emailChangeEvent = {
        target: { name: 'email', value: 'john@example.com' },
      } as React.ChangeEvent<HTMLInputElement>;

      result.current.register('email').onChange(emailChangeEvent);
    });

    // 폼 제출
    act(() => {
      const handleSubmit = result.current.handleSubmit(mockSubmitCallback);
      handleSubmit({
        preventDefault: mockPreventDefault,
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    // preventDefault와 콜백이 호출되었는지 확인
    expect(mockPreventDefault).toHaveBeenCalled();
    expect(mockSubmitCallback).toHaveBeenCalled();
  });

  it('콜백 없이 폼 제출이 가능해야 함', () => {
    const { result } = renderHook(() => useForm({ defaultValues, validators }));
    const mockPreventDefault = jest.fn();

    // 유효한 값으로 필드 설정
    act(() => {
      const nameChangeEvent = {
        target: { name: 'name', value: 'John' },
      } as React.ChangeEvent<HTMLInputElement>;

      result.current.register('name').onChange(nameChangeEvent);
    });

    act(() => {
      const emailChangeEvent = {
        target: { name: 'email', value: 'john@example.com' },
      } as React.ChangeEvent<HTMLInputElement>;

      result.current.register('email').onChange(emailChangeEvent);
    });

    // 콜백 없이 폼 제출
    act(() => {
      const handleSubmit = result.current.handleSubmit();
      handleSubmit({
        preventDefault: mockPreventDefault,
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    // preventDefault가 호출되었는지 확인
    expect(mockPreventDefault).toHaveBeenCalled();
  });
});
