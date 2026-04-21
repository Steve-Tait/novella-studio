import ContactForm from '@/components/ui/contact-form';
import Container from '../components/ui/container';
import { SpotlightBackground } from '../components/ui/spotlight-background';
import Instagram from '@/components/icon/Instagram';
import LinkedIn from '@/components/icon/LinkedIn';

export default function Home() {
  return (
    <main className='flex w-full flex-1 flex-col items-center justify-between'>
      <SpotlightBackground>
        <Container className='flex flex-col'>
          <div className='flex min-h-screen items-center py-20 md:py-40'>
            <h1 className='text-center text-[12vmin] text-balance'>
              <em>You</em> are your most powerful business asset.
            </h1>
          </div>
          <div id='subscribe' className='mx-auto max-w-3xl pb-20 md:pb-40'>
            <ContactForm>
              <div className='mb-6 flex flex-col gap-y-2'>
                <h3 className='text-2xl md:text-3xl'>
                  Novella Studio is launch in Summer 2026!
                </h3>
                <p className='text-xl'>Sign up for exclusive first access:</p>
              </div>
            </ContactForm>
          </div>
        </Container>
      </SpotlightBackground>
    </main>
  );
}
