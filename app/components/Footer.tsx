import Container from './Container';
import Logo from './Logo';
import ArrowRight from './icon/ArrowRight';

export default function Footer() {
  return (
    <footer className='bg-foreground text-background py-10'>
      <Container className='flex flex-col gap-y-10 lg:gap-y-30'>
        <hr />
        <div className='grid gap-10 md:grid-cols-2 md:items-end'>
          <Logo className='h-10 lg:h-15' />
          <div className='flex flex-col gap-y-5'>
            <FooterLink href='#'>Follow us on LinkedIn</FooterLink>
            <FooterLink href='#'>Follow us on Instagram</FooterLink>
          </div>
        </div>
      </Container>
    </footer>
  );
}

const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <a
      href={href}
      className='flex w-full items-center justify-between gap-x-4 border-b pb-5 text-xl'
    >
      {children}
      <ArrowRight className='h-5 shrink-0' />
    </a>
  );
};
