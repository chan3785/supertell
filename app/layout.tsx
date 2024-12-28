import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/toaster';
import '@uploadthing/react/styles.css';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Inter } from 'next/font/google';
import './globals.css';
import { ScreenSizeProvider } from '@/contexts/ScreenSizeContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SuperTell Prediction',
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} overflow-x-hidden overflow-y-scroll`}>
        <NextTopLoader />
        <ScreenSizeProvider>
        <Providers>
          <Toaster />
          {children}
        </Providers>
        </ScreenSizeProvider>
      </body>
    </html>
  );
}
