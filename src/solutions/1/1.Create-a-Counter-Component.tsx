/**
 * 1. Create a Counter Component.
 * 1. 카운터 컴포넌트를 생성합니다.
 *
 * Problem
 * - Create a simple counter component that increases or decreases the count when clicking buttons.
 * - 버튼을 클릭할 때 카운트를 늘리거나 줄이는 간단한 카운터 컴포넌트를 만듭니다.
 */

import { useCounter } from '../../shared/hooks/useCounter';

export const Counter = () => {
  const { count, increase, decrease } = useCounter(0);

  return (
    <div>
      <h1>
        Count: <span id="count">{count}</span>
      </h1>

      <button type="button" id="increase" onClick={increase}>
        1 증가
      </button>
      <button type="button" id="decrease" onClick={decrease}>
        1 감소
      </button>
    </div>
  );
};
