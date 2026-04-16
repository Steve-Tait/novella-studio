import Container from './Container';
import Logo from './Logo';

export default function Header() {
  return (
    <header className='text-background fixed inset-x-0 top-0 z-10 w-full'>
      <Container>
        <div className='border-foreground flex w-full items-center justify-between border-b py-4 lg:py-10'>
          <Logo className='h-10 lg:h-15' />
        </div>
      </Container>
    </header>
  );
}
