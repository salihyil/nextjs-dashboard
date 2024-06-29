import { Metadata } from 'next';
import Wrapper from './components/Wrapper';

export const metadata: Metadata = {
  title: 'React Tour',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Wrapper>{children}</Wrapper>;
}
