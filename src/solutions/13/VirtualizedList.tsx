import { ReactNode, UIEventHandler, useCallback, useState } from 'react';

type IVirtualizedListProps = {
  itemCount: number;
  itemHeight: number;
  containerHeight: number;
  renderItem: ({ index }: { index: number }) => ReactNode;
  // Optional
  overscanCount?: number;
};

export const VirtualizedList = ({
  itemCount,
  itemHeight,
  containerHeight,
  renderItem,
  //
  overscanCount = 3,
}: IVirtualizedListProps) => {
  const totalHeight = itemCount * itemHeight;

  const [startIndex, setStartIndex] = useState<number>(0);
  const endIndex = startIndex + Math.floor(containerHeight / itemHeight);

  const handleScroll = useCallback<UIEventHandler<HTMLDivElement>>((event) => {
    // 0 ~ (totalHeight - containerHeight) 사이의 값
    const scrollTop = event.currentTarget.scrollTop;

    const index = Math.floor(scrollTop / itemHeight);
    const newStartIndex = index;

    if (newStartIndex !== startIndex) {
      setStartIndex(newStartIndex);
    }
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: containerHeight,
        overflow: 'hidden',
      }}
    >
      <div
        style={{ height: '100%', maxHeight: '100%', overflow: 'auto' }}
        onScroll={handleScroll}
      >
        <div style={{ position: 'relative', height: totalHeight }}>
          {Array.from({ length: itemCount }).map((_, index) => {
            if (index < startIndex - overscanCount) return null;
            if (index > endIndex + overscanCount) return null;

            return (
              <div
                key={index}
                data-index={index}
                style={{
                  position: 'absolute',
                  top: index * itemHeight,
                  left: 0,
                  width: '100%',
                  height: itemHeight,
                  backgroundColor: index % 2 === 0 ? '#7e7e7e' : '#a5a5a5',
                }}
              >
                {renderItem({ index })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
