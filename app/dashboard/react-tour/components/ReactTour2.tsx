'use client';

import { useTour } from '@reactour/tour';
import { tour2Steps } from './steps';

const ReactTour2 = () => {
  const { setIsOpen, setMeta, setSteps, meta } = useTour();

  const startTour2 = () => {
    setMeta?.('tour-2');
    setSteps?.(tour2Steps);
    setIsOpen(true);
  };

  return (
    <div className="my-6">
      <p className="first-step2 mb-2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at finibus nulla, quis varius justo.
        Vestibulum lorem lorem, viverra porta metus nec, porta luctus orci
      </p>
      <p className="second-step2 mb-2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at finibus nulla, quis varius justo.
        Vestibulum lorem lorem, viverra porta metus nec, porta luctus orci
      </p>
      <button
        type="button"
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={startTour2}
        disabled={meta === 'tour-2'}
      >
        Open Tour 2
      </button>
    </div>
  );
};

export default ReactTour2;
