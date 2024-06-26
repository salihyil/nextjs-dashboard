import { inter } from '@/app/ui/fonts';
import '@/app/ui/global.css';
import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  // The %s in the template will be replaced with the specific page title.
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({ auth, children }: { auth: React.ReactNode; children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {auth}
        {children}
        <Analytics />
      </body>
    </html>
  );
}
