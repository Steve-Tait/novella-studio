import type { Metadata } from 'next';
import { Newsreader, Fustat, Geist } from 'next/font/google';
import './globals.css';
import Header from '../components/ui/header';
import Footer from '../components/ui/footer';
import { cn } from '@/lib/utils';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const fustat = Fustat({
  variable: '--font-fustat',
  subsets: ['latin'],
});

const newsreader = Newsreader({
  variable: '--font-newsreader',
  style: 'italic',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Novella Studio',
  description: 'You are your most powerful business asset.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={cn(
        'antialiased',
        fustat.variable,
        newsreader.variable,
        'font-sans',
        geist.variable
      )}
    >
      <body className='flex min-h-full flex-col'>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
