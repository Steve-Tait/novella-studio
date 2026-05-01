import Container from '../components/ui/container';
import { SpotlightBackground } from '../components/ui/spotlight-background';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <main className='flex w-full flex-1 flex-col items-center justify-between'>
      <SpotlightBackground>
        <Container className='flex flex-col'>
          <div className='flex min-h-screen flex-col items-center justify-center gap-y-4 py-20 text-center md:py-40'>
            <h1 className='text-[12vmin] text-balance'>
              <em>You</em> are your most powerful business asset.
            </h1>
            <p className='text-2xl md:text-3xl'>
              Novella Studio is launching Summer 2026.
            </p>
            <Link href='#subscribe' className={cn(buttonVariants(), 'mt-4')}>
              Exclusive First Access
            </Link>
          </div>
        </Container>
      </SpotlightBackground>
    </main>
  );
}
