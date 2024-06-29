'use client';

import { useTour } from '@reactour/tour';
import { tour1Steps } from './steps';

const ReactTour1 = () => {
  const { setIsOpen, setMeta, setSteps, meta } = useTour();

  const startTour1 = () => {
    setMeta?.('tour-1');
    setSteps?.(tour1Steps);
    setIsOpen(true);
  };

  return (
    <div className="my-6">
      <p className="third-step1 mb-2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at finibus nulla, quis varius justo.
        Vestibulum lorem lorem, viverra porta metus nec, porta luctus orci
      </p>
      <p className="first-step1 mb-2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at finibus nulla, quis varius justo.
        Vestibulum lorem lorem, viverra porta metus nec, porta luctus orci
      </p>
      <p className="second-step1 mb-2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at finibus nulla, quis varius justo.
        Vestibulum lorem lorem, viverra porta metus nec, porta luctus orci
      </p>
      <button
        type="button"
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={startTour1}
        disabled={meta === 'tour-1'}
      >
        Open Tour 1
      </button>
    </div>
  );
};

export default ReactTour1;
