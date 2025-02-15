/**
 * 7. Implement a Tabs Component
 *
 * Problem:
 * - Create a tabs component where each tab displays different content when selected.
 * - 탭을 선택하면 각 탭에 다른 콘텐츠가 표시되는 탭 컴포넌트를 만듭니다.
 */

import { Tab, Tabs } from './Tabs';

const tabs: Tab[] = [
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

export const Solution7 = () => {
  return <Tabs tabs={tabs} />;
};
