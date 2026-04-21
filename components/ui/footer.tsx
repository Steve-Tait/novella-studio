import Container from './container';
import Logo from '../icon/Logo';
import ArrowRight from '../icon/ArrowRight';

export default function Footer() {
  return (
    <footer className='bg-foreground text-background py-10'>
      <Container className='flex flex-col gap-y-10 lg:gap-y-30'>
        <hr />
        <div className='grid gap-x-20 gap-y-10 md:grid-cols-2 md:items-end'>
          <Logo className='h-10 lg:h-15' />
          <div className='flex flex-col gap-y-12'>
            <div className='flex flex-col gap-y-3 lg:gap-y-5'>
              <FooterLink href='https://www.instagram.com/novellastudio__/'>
                Follow us on Instagram
              </FooterLink>
              <FooterLink href='https://www.linkedin.com/company/novella-studio/'>
                Follow us on LinkedIn
              </FooterLink>
            </div>
            <div className='grid grid-cols-2 gap-5 text-xs'>
              <p className='border-t pt-3 lg:pt-5'>Novella Studio</p>
              <p className='border-t pt-3 lg:pt-5'>
                Works © Novella Studio {new Date().getFullYear()}.<br />
                All rights reserved.
              </p>
            </div>
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
      target='_blank'
      className='group/footer-link flex w-full items-center justify-between gap-x-4 border-b pb-3 text-xl last:border-b-0 last:pb-0 lg:pb-5'
    >
      {children}
      <ArrowRight className='h-5 shrink-0 transition-transform group-hover/footer-link:-rotate-45' />
    </a>
  );
};
