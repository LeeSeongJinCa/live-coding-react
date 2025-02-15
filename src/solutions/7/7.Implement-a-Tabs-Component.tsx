/**
 * 7. Implement a Tabs Component
 *
 * Problem:
 * - Create a tabs component where each tab displays different content when selected.
 * - 탭을 선택하면 각 탭에 다른 콘텐츠가 표시되는 탭 컴포넌트를 만듭니다.
 */

import { ButtonHTMLAttributes, useState } from 'react';

const tabs = [
  {
    key: 1,
    label: 'First',
    content: <div>This is First Content</div>,
  },
  {
    key: 2,
    label: 'Second',
    content: <div>This is Second Content</div>,
  },
  {
    key: 3,
    label: 'Third',
    content: <div>This is Third Content</div>,
  },
];

export const Tabs = () => {
  if (tabs.length === 0) {
    throw new Error('Tabs must have at least one tab');
  }

  const [activeTab, setActiveTab] = useState<number>(tabs[0].key);

  return (
    <div
      style={{
        padding: '4px',
        border: '1px solid black',
      }}
    >
      <div className="tab-buttons" style={{ display: 'flex', alignItems: 'center' }}>
        {tabs.map((tab) => (
          <StyledTabButton
            key={tab.key}
            className="tab-button"
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </StyledTabButton>
        ))}
      </div>

      <div
        className="tab-content"
        style={{
          marginTop: '4px',
          padding: '4px',
          border: '1px solid black',
          boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.3)',
        }}
      >
        {tabs.find((tab) => tab.key === activeTab)?.content}
      </div>
    </div>
  );
};

const StyledTabButton = ({
  style,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
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
