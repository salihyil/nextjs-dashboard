'use client';

import { TourProvider } from '@reactour/tour';
type Props = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: Props) => {
  const tourConfig = [
    {
      selector: 'step-1',
      content: "Ok, let's start with the name of the Tour that is about to begin.",
    },
    {
      selector: 'step-2',
      content: 'And this is our cool bus...',
    },
  ];

  return (
    <TourProvider
      steps={tourConfig}
      badgeContent={({ totalSteps, currentStep }) => currentStep + 1 + '/' + totalSteps}
      onClickMask={({ setCurrentStep, currentStep, steps, setIsOpen }) => {
        if (steps) {
          if (currentStep === steps.length - 1) {
            setIsOpen(false);
          }
          setCurrentStep((s) => (s === steps.length - 1 ? 0 : s + 1));
        }
      }}
    >
      {children}
    </TourProvider>
  );
};

export default Wrapper;
