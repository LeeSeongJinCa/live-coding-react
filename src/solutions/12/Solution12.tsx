/**
 * 12. Build a Multi-Step Form
 *
 * Problem:
 * - Create a multi-step form where users can navigate between different steps of the form.
 * - 사용자가 양식의 여러 단계 사이를 이동할 수 있는 다단계 양식을 만듭니다.
 */

import { IStep } from '../../types';
import { Steps } from './Steps';

const steps: IStep[] = [
  {
    id: '1',
    label: 'Step 1',
    component: (
      <div>
        <p>Content 1</p>
      </div>
    ),
  },
  {
    id: '2',
    label: 'Step 2',
    component: (
      <div>
        <p>Content 2</p>
      </div>
    ),
  },
  {
    id: '3',
    label: 'Step 3',
    component: (
      <div>
        <p>Content 3</p>
      </div>
    ),
  },
];

export const Solution12 = () => {
  return (
    <Steps
      steps={steps}
      onStart={() => {
        console.log('onStart');
      }}
      onStep={(step) => {
        console.log('onStep:', step);
      }}
      onEnd={() => {
        console.log('onEnd');
      }}
    />
  );
};
