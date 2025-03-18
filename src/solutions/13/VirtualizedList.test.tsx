import { act, fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';

import { VirtualizedList, VirtualizedListRef } from './VirtualizedList';

describe('VirtualizedList', () => {
  const defaultProps = {
    itemCount: 1000,
    itemHeight: 50,
    containerHeight: 50 * 8, // 한 화면에 8개씩 표시
    renderItem: ({ index }: { index: number }) => <div>Item {index}</div>,
    //
    overscanCount: 3,
  } as const;

  it('초기 렌더링 시 올바른 수의 아이템을 표시해야 한다.', () => {
    const result = render(<VirtualizedList {...defaultProps} />);

    // containerHeight / itemHeight + overscanCount * 2 만큼의 아이템이 보여야 함
    // 단, 초기 렌더링 시에는 overscan start는 없으므로 총 아이템 수는 8 + 3 = 11
    const visibleItems = result.getAllByText(/Item \d+/);
    const expectedItemCount =
      Math.floor(defaultProps.containerHeight / defaultProps.itemHeight) +
      defaultProps.overscanCount; // visible + overscan(end)
    expect(visibleItems).toHaveLength(expectedItemCount);
  });

  it('스크롤 시 올바른 아이템이 렌더링되어야 한다.', () => {
    // scrollTo 메서드 Mocking
    Element.prototype.scrollTo = jest.fn();

    const result = render(<VirtualizedList {...defaultProps} />);

    const scrollableElement = result.container.querySelector(
      '.VirtualizedList-scrollable',
    ) as HTMLDivElement;
    expect(scrollableElement).not.toBeNull();

    // 스크롤 이벤트 발생
    const scrollAmount = defaultProps.itemHeight * 8;
    fireEvent.scroll(scrollableElement, {
      target: { scrollTop: scrollAmount }, // 8번째 아이템으로 스크롤
    });
    expect(scrollableElement.scrollTop).toBe(scrollAmount);

    // 새로운 위치의 아이템들이 보여야 함
    const visibleItems = result.getAllByText(/Item \d+/);
    const startIndex = 8;
    const endIndex =
      startIndex + Math.floor(defaultProps.containerHeight / defaultProps.itemHeight) - 1;
    // overscan으로 인해 이전 아이템도 보임
    expect(visibleItems[0]).toHaveTextContent(
      `Item ${startIndex - defaultProps.overscanCount}`,
    );
    // overscan으로 인해 이후 아이템도 보임
    expect(visibleItems[visibleItems.length - 1]).toHaveTextContent(
      `Item ${endIndex + defaultProps.overscanCount}`,
    );
  });

  it('scrollToIndex 메서드가 호출되어야 한다.', () => {
    // scrollTo 메서드 Mocking
    Element.prototype.scrollTo = jest.fn();

    const ref = createRef<VirtualizedListRef>();
    render(<VirtualizedList {...defaultProps} ref={ref} />);

    // 스크롤 이벤트 발생
    const targetIndex = 50;
    act(() => {
      ref.current?.scrollToIndex(targetIndex);
    });

    expect(Element.prototype.scrollTo).toHaveBeenCalledWith({
      top: targetIndex * defaultProps.itemHeight,
    });
  });

  it('overscanCount prop이 올바르게 적용되어야 한다.', () => {
    const customProps = { ...defaultProps, overscanCount: 5 };
    const result = render(<VirtualizedList {...customProps} />);

    const visibleItems = result.getAllByText(/Item \d+/);
    const expectedItemCount =
      Math.floor(customProps.containerHeight / customProps.itemHeight) +
      customProps.overscanCount; // visible + custom overscan
    expect(visibleItems).toHaveLength(expectedItemCount);
  });

  it('각 아이템의 위치가 올바르게 계산되어야 한다.', () => {
    // scrollTo 메서드 Mocking
    Element.prototype.scrollTo = jest.fn();

    const result = render(<VirtualizedList {...defaultProps} />);

    const scrollableElement = result.container.querySelector(
      '.VirtualizedList-scrollable',
    ) as HTMLDivElement;
    expect(scrollableElement).not.toBeNull();

    // 스크롤 이벤트 발생
    const scrollAmount = defaultProps.itemHeight * 12;
    fireEvent.scroll(scrollableElement, {
      target: { scrollTop: scrollAmount }, // 12번째 아이템으로 스크롤
    });
    expect(scrollableElement.scrollTop).toBe(scrollAmount);

    const items = result.getAllByText(/Item \d+/);
    const firstItem = items[0].parentElement;
    const lastItem = items[items.length - 1].parentElement;

    const startIndex = 12;
    const endIndex =
      startIndex + Math.floor(defaultProps.containerHeight / defaultProps.itemHeight) - 1;

    expect(firstItem).toHaveStyle({
      position: 'absolute',
      top: `${(startIndex - defaultProps.overscanCount) * defaultProps.itemHeight}px`,
      height: `${defaultProps.itemHeight}px`,
    });
    expect(lastItem).toHaveStyle({
      position: 'absolute',
      top: `${(endIndex + defaultProps.overscanCount) * defaultProps.itemHeight}px`,
      height: `${defaultProps.itemHeight}px`,
    });
  });
});
