import type { Metadata } from 'next';
import { Newsreader, Fustat } from 'next/font/google';
import './globals.css';
import Header from '../components/ui/header';
import Footer from '../components/ui/footer';
import { cn } from '@/lib/utils';
import Head from 'next/dist/shared/lib/head';
import { GoogleTagManager } from '@next/third-parties/google';

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
        'font-sans'
      )}
    >
      <GoogleTagManager gtmId='G-VE2EQWDNXK' />
      <Head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link
          rel='icon'
          href='/icon?<generated>'
          type='image/<generated>'
          sizes='<generated>'
        />
        <link
          rel='apple-touch-icon'
          href='/apple-icon?<generated>'
          type='image/<generated>'
          sizes='<generated>'
        />
        <meta name='apple-mobile-web-app-title' content='Novella' />
      </Head>
      <body className='flex min-h-full flex-col'>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
