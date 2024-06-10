'use client';

import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="animate-slide">
      <pre className="inline-block rounded-lg bg-muted-foreground px-2 py-1">
        {pathname}
      </pre>
      {children}
    </div>
  );
}
