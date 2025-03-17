/**
 * 13. Implement a Virtualized List
 *
 * Problem:
 * - Create a virtualized list component that efficiently renders a large list of items, only rendering items that are visible within the viewport.
 * - 뷰포트 내에 표시되는 항목만 렌더링하여 큰 항목 목록을 효율적으로 렌더링하는 가상화된 목록 컴포넌트를 만듭니다.
 */

import { useEffect } from 'react';

import { VirtualizedList } from './VirtualizedList';

export const Solution13 = () => {
  const items = Array.from({ length: 100 }, (_, index) => ({ id: index + 1 }));
  const itemHeight = 100;
  const containerHeight = 100 * 3;

  return (
    <div
      style={{
        margin: '24px',
      }}
    >
      <VirtualizedList
        itemCount={items.length}
        itemHeight={itemHeight}
        containerHeight={containerHeight}
        renderItem={({ index }) => <Item index={index} />}
      />
    </div>
  );
};

const Item = ({ index }: { index: number }) => {
  useEffect(() => {
    console.log('index:', index);
  }, []);
  return <div>{index}</div>;
};
