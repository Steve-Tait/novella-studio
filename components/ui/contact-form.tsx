'use client';

import { useActionState, useRef, useEffect } from 'react';
import { subscribe } from '@/lib/actions';
import { cn } from '@/lib/utils';
import { buttonVariants } from './button';
import LinkedIn from '../icon/LinkedIn';
import Instagram from '../icon/Instagram';

type FormField = {
  type?: string;
  name: string;
  placeholder?: string;
  isWide?: boolean;
  label?: string;
};

const formFields: FormField[] = [
  {
    label: 'First Name *',
    name: 'firstName',
    placeholder: 'First name',
  },
  {
    label: 'Last Name *',
    name: 'lastName',
    placeholder: 'Last name',
  },
  {
    label: 'Email *',
    type: 'email',
    name: 'email',
    isWide: true,
    placeholder: 'someone@email.com',
  },
  {
    name: 'company',
    type: 'honeypot',
    placeholder: 'company',
  },
];

const ContactForm = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(subscribe, null);

  useEffect(() => {
    if (state?.wasSuccessful) {
      ref.current?.reset();
    }
  }, [state?.wasSuccessful]);

  if (state?.wasSuccessful) {
    const name = state?.fields?.firstName;
    return (
      <div className='flex flex-col items-center justify-center gap-y-4 sm:justify-start'>
        <h3 className='text-2xl md:text-3xl'>{`Thank you${name ? `, ${name}` : ''}, please check your inbox!`}</h3>
        <p className='text-lg'>
          We can&apos;t wait to welcome you on the journey. In the meantime,
          follow our story on socials:
        </p>
        <div className='flex justify-center gap-4'>
          <a
            className='bg-ivory text-umber hover:bg-brass size-10 rounded-full p-2 transition-colors'
            href='https://www.instagram.com/novellastudio__/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Instagram className='size-full' />
          </a>
          <a
            className='bg-ivory text-umber hover:bg-brass size-10 rounded-full p-2 transition-colors'
            href='https://www.linkedin.com/company/novella-studio/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <LinkedIn className='size-full' />
          </a>
        </div>
      </div>
    );
  } else if (state?.error) {
    console.error('error', state.error);
  }

  return (
    <>
      {children}
      <form
        className='flex flex-col gap-y-6 sm:items-center sm:gap-y-10'
        ref={ref}
        action={formAction}
      >
        <div className='grid w-full grid-cols-2 gap-4 text-left'>
          {formFields.map(({ type, name, placeholder, isWide, label }, i) => (
            <div
              className={cn(
                type === 'honeypot' && 'field-company',
                isWide && 'col-span-2'
              )}
              key={name}
            >
              <>
                {type === 'honeypot' ? (
                  <input type='text' name={name} placeholder={placeholder} />
                ) : (
                  <>
                    <label className='mb-1' htmlFor={name}>
                      {label}
                    </label>
                    <input
                      id={name}
                      type={type || 'text'}
                      name={name}
                      placeholder={placeholder}
                      className='focus:outline-primary outline-inset bg-ivory text-umber w-full min-w-0 rounded-xl px-4 py-3 outline-2 outline-transparent duration-300'
                    />
                  </>
                )}
                {state?.error?.[name]?._errors.map((e: string, i: number) => (
                  <p className='text-destructive mt-2 text-xs/none' key={i}>
                    {e}
                  </p>
                ))}
              </>
            </div>
          ))}
          <p className='col-span-2'>
            By signing up, you agree to join Novella Studio&apos;s email list
            and can opt-out at any time.
          </p>
        </div>

        <button type='submit' className={buttonVariants()}>
          Sign Up
        </button>
      </form>
    </>
  );
};
export default ContactForm;
