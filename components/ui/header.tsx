'use client';

import Container from './container';
import Logo from '../icon/Logo';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/dist/client/link';
import { buttonVariants } from './button';

export default function Header() {
  const ref = useRef<HTMLElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const setHeaderHeight = () => {
      const header = ref.current;
      if (!header) return;
      document.documentElement.style.setProperty(
        '--header-height',
        `${header.offsetHeight}px`
      );
    };

    const resizeObserver = new ResizeObserver(setHeaderHeight);
    resizeObserver.observe(ref.current);
    setHeaderHeight();
    window.addEventListener('resize', setHeaderHeight);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', setHeaderHeight);
    };
  }, []);

  return (
    <header
      ref={ref}
      className={cn(
        'bg-foreground text-background dark:text-foreground fixed inset-x-0 top-0 z-10 w-full transition-colors duration-500 dark:bg-transparent',
        !hasScrolled && 'dark'
      )}
    >
      <Container>
        <div
          className={cn(
            'flex w-full items-center justify-between border-b transition-[padding] duration-500',
            hasScrolled ? 'py-3 lg:py-4' : 'py-4 lg:py-10'
          )}
        >
          <Logo className='h-10 lg:h-15' />
          <Link href='#subscribe' className={buttonVariants()}>
            Sign Up
          </Link>
        </div>
      </Container>
    </header>
  );
}
