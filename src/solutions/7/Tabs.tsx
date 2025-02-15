import { useState } from 'react';

export type Tab = {
  key: number;
  label: string;
  content: React.ReactNode;
};

interface TabsProps {
  tabs: Tab[];
}

export const Tabs = ({ tabs }: TabsProps) => {
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
          <button
            key={tab.key}
            type="button"
            className="tab-button"
            style={{
              width: 64,
              padding: '4px',
            }}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
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
