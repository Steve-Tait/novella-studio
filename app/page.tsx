import Container from './components/Container';
import { SpotlightBackground } from './components/SpotlightBackground';

export default function Home() {
  return (
    <main className='flex w-full flex-1 flex-col items-center justify-between'>
      <SpotlightBackground className='flex min-h-screen items-center py-40 text-center'>
        <Container>
          <h1 className='text-[10vmin] text-balance'>
            <em>You</em> are your most powerful business asset.
          </h1>
        </Container>
      </SpotlightBackground>
    </main>
  );
}
