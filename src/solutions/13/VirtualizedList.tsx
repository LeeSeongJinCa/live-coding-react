import {
  forwardRef,
  ReactNode,
  UIEventHandler,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

export interface VirtualizedListRef {
  scrollToIndex: (index: number) => void;
}

export interface VirtualizedListProps {
  itemCount: number;
  itemHeight: number;
  containerHeight: number;
  renderItem: ({ index }: { index: number }) => ReactNode;
  // Optional
  overscanCount?: number;
}

export const VirtualizedList = forwardRef<VirtualizedListRef, VirtualizedListProps>(
  (
    {
      itemCount,
      itemHeight,
      containerHeight,
      renderItem,
      //
      overscanCount = 3,
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    useImperativeHandle(ref, () => {
      return {
        scrollToIndex: (index: number) => {
          const scrollTop = index * itemHeight;
          containerRef.current?.scrollTo({ top: scrollTop });
        },
      };
    });

    const totalHeight = itemCount * itemHeight;

    const [startIndex, setStartIndex] = useState<number>(0);
    const endIndex = startIndex + (Math.floor(containerHeight / itemHeight) - 1); // index이므로 1 빼줌

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
        className="VirtualizedList-root"
        style={{
          position: 'relative',
          width: '100%',
          height: containerHeight,
          overflow: 'hidden',
        }}
      >
        <div
          ref={containerRef}
          className="VirtualizedList-scrollable"
          style={{ height: '100%', maxHeight: '100%', overflow: 'auto' }}
          onScroll={handleScroll}
        >
          <div
            className="VirtualizedList-content"
            style={{ position: 'relative', height: totalHeight }}
          >
            {Array.from({ length: itemCount }).map((_, index) => {
              if (index < startIndex - overscanCount) return null;
              if (index > endIndex + overscanCount) return null;

              return (
                <div
                  key={index}
                  data-index={index}
                  className="VirtualizedList-item"
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
  },
);

VirtualizedList.displayName = 'VirtualizedList';
