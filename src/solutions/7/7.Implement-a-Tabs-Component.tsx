/**
 * 7. Implement a Tabs Component
 *
 * Problem:
 * - Create a tabs component where each tab displays different content when selected.
 * - 탭을 선택하면 각 탭에 다른 콘텐츠가 표시되는 탭 컴포넌트를 만듭니다.
 */

import { ButtonHTMLAttributes, useState } from 'react';

export const Tabs = () => {
  const [tab, setTab] = useState(0);

  return (
    <div
      style={{
        padding: '4px',
        border: '1px solid black',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TabButton onClick={() => setTab(0)}>1</TabButton>
        <TabButton onClick={() => setTab(1)}>2</TabButton>
        <TabButton onClick={() => setTab(2)}>3</TabButton>
      </div>

      <div
        style={{
          marginTop: '4px',
          padding: '4px',
          border: '1px solid black',
          boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.3)',
        }}
      >
        {tab === 0 && <div>This is First Content</div>}
        {tab === 1 && <div>This is Second Content</div>}
        {tab === 2 && <div>This is Third Content</div>}
      </div>
    </div>
  );
};

const TabButton = ({ style, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type="button"
      style={{
        width: 64,
        padding: '4px',
        ...style,
      }}
      {...props}
    />
  );
};
