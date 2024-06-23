import { Metadata } from 'next';

import LandingPage from './LandingPage';
import ScrollFadeIn from './ScrollFadeIn';

export const metadata: Metadata = {
  title: 'React Intersection Observer',
};

const Page = () => {
  return (
    <div>
      <h1>React Intersection Observer</h1>
      <div className="flex min-h-screen flex-col items-center justify-center space-y-4">
        <LandingPage />
        <ScrollFadeIn />
      </div>
    </div>
  );
};

export default Page;
