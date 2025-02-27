import { useState } from 'react';

import { IStep } from '../../types';

interface StepsProps {
  steps: IStep[];
  onStart?: () => void;
  onStep?: (step: number) => void;
  onEnd?: () => void;
}

export const Steps = ({ steps, onStart, onStep, onEnd }: StepsProps) => {
  // step은 0 부터 시작 (= index)
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handlePrev = () => {
    setCurrentStep((prev) => {
      const newStep = Math.max(prev - 1, 0);
      // 현재 클릭된 스텝이 첫 번째 스텝이면 onStart 호출
      if (prev === 0) onStart?.();
      onStep?.(newStep);
      return newStep;
    });
  };

  const handleNext = () => {
    setCurrentStep((prev) => {
      const newStep = Math.min(prev + 1, steps.length - 1);
      // 현재 클릭된 스텝이 마지막 스텝이면 onEnd 호출
      if (prev === steps.length - 1) onEnd?.();
      onStep?.(newStep);
      return newStep;
    });
  };

  return (
    <div
      style={{
        width: '500px',
        padding: '12px',
        border: '1px solid',
      }}
    >
      <main
        data-testid="steps-container"
        style={{
          display: 'flex',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {steps.map((step, index) => (
          <section
            key={step.id}
            aria-label={`content content-of-step-${index + 1}`}
            aria-current={currentStep === index}
            style={{
              flexShrink: 0,
              width: '100%',
              height: '100%',
              backgroundColor: index % 2 === 0 ? '#818181' : '#bfbfbf',
              transform: `translateX(calc(${currentStep} * -100%))`,
              transition: 'transform 300ms ease-in-out',
            }}
          >
            <h2>{step.label}</h2>

            <div>{step.component}</div>
          </section>
        ))}
      </main>

      <nav
        data-testid="steps-navigation"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <button type="button" data-testid="step-button-prev" onClick={handlePrev}>
          Previous
        </button>
        <button type="button" data-testid="step-button-next" onClick={handleNext}>
          Next
        </button>
      </nav>
    </div>
  );
};
