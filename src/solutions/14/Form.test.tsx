import { fireEvent, render } from '@testing-library/react';

import { Form } from './Form';

describe('Form', () => {
  it('폼이 렌더링되고 자식 요소를 보여줍니다', () => {
    const result = render(
      <Form>
        <input type="text" name="name" data-testid="test-input-name" />
        <input type="email" name="email" data-testid="test-input-email" />
        <button type="submit" data-testid="test-button-submit">
          제출
        </button>
      </Form>,
    );

    expect(result.container).toBeInTheDocument();
    expect(result.getByTestId('test-input-name')).toBeInTheDocument();
    expect(result.getByTestId('test-input-email')).toBeInTheDocument();
    expect(result.getByTestId('test-button-submit')).toBeInTheDocument();
  });

  it('폼 제출 시 onSubmit 핸들러가 호출됩니다', () => {
    const handleSubmit = jest.fn((e) => e.preventDefault());

    const result = render(
      <Form onSubmit={handleSubmit}>
        <button type="submit">제출</button>
      </Form>,
    );

    fireEvent.submit(result.getByLabelText('form'));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
