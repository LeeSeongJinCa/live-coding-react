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
