/**
 * 12. Build a Multi-Step Form
 *
 * Problem:
 * - Create a multi-step form where users can navigate between different steps of the form.
 * - 사용자가 양식의 여러 단계 사이를 이동할 수 있는 다단계 양식을 만듭니다.
 */

import { useState } from 'react';

import { IStep } from '../../types';

export const Solution12 = () => {
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

  return <Steps steps={steps} />;
};

const Steps = ({ steps }: { steps: IStep[] }) => {
  // step은 0 부터 시작 (= index)
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handlePrev = () => {
    setCurrentStep((prev) => {
      const newStep = prev - 1;
      return Math.max(newStep, 0);
    });
  };

  const handleNext = () => {
    setCurrentStep((prev) => {
      const newStep = prev + 1;
      return Math.min(newStep, steps.length - 1);
    });
  };

  return (
    <div
      style={{
        width: '500px',
        padding: '12px',
        border: '1px solid',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          transform: `translateX(calc(${currentStep} * -100%))`,
          transition: 'transform 300ms ease-in-out',
        }}
      >
        {steps.map((step, index) => (
          <div
            key={step.id}
            style={{
              flexShrink: 0,
              width: '100%',
              height: '100%',
              backgroundColor: index % 2 === 0 ? '#818181' : '#bfbfbf',
            }}
          >
            <p>{step.label}</p>

            <div>{step.component}</div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <button type="button" onClick={handlePrev}>
          Previous
        </button>
        <button type="button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};
