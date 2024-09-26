import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import MainHeader from '@/components/main-header/main-header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cookbook',
  description: 'Document and share delicious recipes.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
