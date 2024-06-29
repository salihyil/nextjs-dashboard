import { Metadata } from 'next';

import Child from '@/app/dashboard/higher-order-component/Child';
import ChildSecond from '@/app/dashboard/higher-order-component/ChildSecond';

export const metadata: Metadata = {
  title: 'Higher Order Component',
};

export default function Page() {
  return (
    <div>
      <Child />
      <ChildSecond />
    </div>
  );
}
