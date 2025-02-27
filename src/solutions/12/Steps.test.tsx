import { fireEvent, render } from '@testing-library/react';

import { IStep } from '../../types';
import { Steps } from './Steps';

const steps: IStep[] = [
  {
    id: '1',
    label: 'Step 1',
    component: (
      <div>
        <p>Content 1</p>
      </div>
    ),
  },
  {
    id: '2',
    label: 'Step 2',
    component: (
      <div>
        <p>Content 2</p>
      </div>
    ),
  },
  {
    id: '3',
    label: 'Step 3',
    component: (
      <div>
        <p>Content 3</p>
      </div>
    ),
  },
];

describe('Steps', () => {
  test('steps가 빈 배열이면 스탭 섹션이 보이지 않는다.', () => {
    const result = render(<Steps steps={[]} />);

    expect(result.queryAllByRole('section')).toHaveLength(0);
    expect(result.queryAllByRole('heading', { level: 2 })).toHaveLength(0);
  });

  test('steps가 있으면 스탭 컨테이너가 보인다', () => {
    const result = render(<Steps steps={steps} />);

    expect(result.queryByRole('main')).toBeInTheDocument();
  });

  test('steps가 있으면 첫 번째 스탭이 보인다.', () => {
    const result = render(<Steps steps={steps} />);

    expect(result.getAllByRole('heading', { level: 2 })).toHaveLength(steps.length);
    expect(result.getAllByRole('heading', { level: 2 })[0]).toHaveTextContent(
      steps[0].label,
    );
    expect(result.getAllByLabelText('content', { exact: false })[0]).toHaveStyle(
      'transform: translateX(calc(0 * -100%))',
    );
  });

  test('스탭 네비게이션이 보인다.', () => {
    const result = render(<Steps steps={steps} />);

    expect(result.queryByRole('navigation')).toBeInTheDocument();
    expect(result.queryByRole('button', { name: 'Previous' })).toBeInTheDocument();
    expect(result.queryByRole('button', { name: 'Next' })).toBeInTheDocument();
  });

  test('스탭 네비게이션의 다음 버튼을 누르면 다음 스탭으로 이동한다.', () => {
    const result = render(<Steps steps={steps} />);

    const nextButton = result.getByRole('button', { name: 'Next' });

    fireEvent.click(nextButton);

    expect(result.getAllByLabelText('content', { exact: false })[1]).toHaveStyle(
      'transform: translateX(calc(1 * -100%))',
    );
  });

  test('스탭 네비게이션의 이전 버튼을 누르면 이전 스탭으로 이동한다.', () => {
    const result = render(<Steps steps={steps} />);

    const nextButton = result.getByRole('button', { name: 'Next' });

    fireEvent.click(nextButton);

    const prevButton = result.getByRole('button', { name: 'Previous' });

    fireEvent.click(prevButton);

    expect(result.getAllByLabelText('content', { exact: false })[0]).toHaveStyle(
      'transform: translateX(calc(0 * -100%))',
    );
  });

  test('스탭 네비게이션의 첫 번째 스탭에서 이전 버튼을 누르면 이동하지 않는다.', () => {
    const result = render(<Steps steps={steps} />);

    const prevButton = result.getByRole('button', { name: 'Previous' });

    Array.from({ length: 5 }).forEach(() => {
      fireEvent.click(prevButton);
    });

    expect(result.getAllByLabelText('content', { exact: false })[0]).toHaveStyle(
      'transform: translateX(calc(0 * -100%))',
    );
  });

  test('스탭 네비게이션의 마지막 번째 스탭에서 다음 버튼을 누르면 이동하지 않는다.', () => {
    const result = render(<Steps steps={steps} />);

    const nextButton = result.getByRole('button', { name: 'Next' });

    Array.from({ length: 5 }).forEach(() => {
      fireEvent.click(nextButton);
    });

    expect(result.getAllByLabelText('content', { exact: false })[2]).toHaveStyle(
      `transform: translateX(calc(${steps.length - 1} * -100%))`,
    );
  });
});
