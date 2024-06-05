'use client';

import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  return (
    <div className="animate-slide">
      <pre className="bg-muted-foreground inline-block rounded-lg px-2 py-1">
        {pathname}
      </pre>
      {children}
    </div>
  );
}
