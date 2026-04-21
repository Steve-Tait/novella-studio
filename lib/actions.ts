'use server';

import { subscribeSchema } from './schema';
import { TSubscribeResponse } from './types';

export async function subscribe(
  prevState: TSubscribeResponse | null,
  formData: FormData
): Promise<TSubscribeResponse> {
  let response = {} as TSubscribeResponse;

  try {
    const validatedFields = subscribeSchema.safeParse({
      email: formData.get('email'),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
    });

    //issue with Zod typescript
    if (validatedFields.success === false) {
      throw validatedFields.error.format();
    }

    if (!process.env.BREVO_API_KEY || !process.env.BREVO_LIST_ID)
      throw 'Brevo API Key or List ID not configured properly';
    const listId = Number(process.env.BREVO_LIST_ID);
    if (!listId || Number.isNaN(listId))
      throw 'Brevo List ID environment variable is invalid';

    const fields = validatedFields.data;
    const res = await fetchWithRetry('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        'user-agent': 'novella/subscribe (vercel)',
      },
      body: JSON.stringify({
        updateEnabled: true,
        email: fields.email,
        listIds: [listId],
        attributes: {
          FIRSTNAME: fields.firstName,
          LASTNAME: fields.lastName,
        },
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw errorData;
    }

    notifyAdmin(fields);
    response = {
      wasSuccessful: true,
      data: res?.status === 204 ? 'No Content' : await res.json(),
      fields: fields,
    };
  } catch (e) {
    response = {
      wasSuccessful: false,
      error: e,
    };
  }
  return response;
}
const RETRYABLE_CODES = new Set([
  'UND_ERR_SOCKET',
  'ECONNRESET',
  'ETIMEDOUT',
  'ENETUNREACH',
  'EAI_AGAIN',
]);

type FetchWithRetryOptions = {
  retries?: number;
  timeoutMs?: number;
};
type FetchError = Error & {
  cause?: { code?: string };
  code?: string;
  name?: string;
};
async function fetchWithRetry(
  url: string,
  init: RequestInit,
  opts: FetchWithRetryOptions = {}
) {
  const retries = opts.retries ?? 3;
  const timeoutMs = opts.timeoutMs ?? 10000;
  let lastError: FetchError | null = null;
  for (let attempt = 1; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, {
        ...init,
        signal: controller.signal,
        cache: 'no-store',
      });
      clearTimeout(timer);
      return res;
    } catch (err: unknown) {
      clearTimeout(timer);
      lastError = err as FetchError;
      const code =
        (err as FetchError)?.cause?.code || (err as FetchError)?.code;
      const isAbort = (err as FetchError)?.name === 'AbortError';
      const retryable = RETRYABLE_CODES.has(code ?? '') || isAbort;
      if (attempt < retries && retryable) {
        // simple backoff
        await new Promise(r => setTimeout(r, 400 * attempt));
        continue;
      }
      throw err;
    }
  }
  throw lastError;
}

const notifyAdmin = async (fields: {
  email: string;
  firstName?: string;
  lastName?: string;
  agree?: boolean;
}) => {
  if (!process.env.BREVO_API_KEY) return;
  return await fetchWithRetry('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.BREVO_API_KEY,
      'user-agent': 'novella/subscribe',
    },
    body: JSON.stringify({
      sender: {
        name: 'System Notification',
        email: 'info@novella-studio.co.uk',
      },
      to: [{ email: 'info@novella-studio.co.uk', name: 'Novella Studio' }],
      subject: 'New Contact Added to Your List',
      htmlContent: `
        <p>A new contact has been added to your Brevo list:</p>
        <ul>
          ${fields.firstName ? `<li><b>First Name:</b> ${fields.firstName}</li>` : ''}
          ${fields.lastName ? `<li><b>Last Name:</b> ${fields.lastName}</li>` : ''}
          <li><b>Email:</b> ${fields.email}</li>
        </ul>
      `,
    }),
  });
};
const notifySubscriber = async (
  fields: {
    email: string;
    firstName?: string;
    lastName?: string;
    agree?: boolean;
  },
  message: string
) => {
  if (!process.env.BREVO_API_KEY) return;
  return await fetchWithRetry('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.BREVO_API_KEY,
      'user-agent': 'novella/subscribe',
    },
    body: JSON.stringify({
      sender: {
        name: 'System Notification',
        email: 'info@novella-studio.co.uk',
      },
      to: [
        {
          email: fields.email,
          name: fields.firstName
            ? `${fields.firstName} ${fields.lastName || ''}`
            : undefined,
        },
      ],
      subject: 'Thank you for subscribing',
      htmlContent: `
        <h4>${fields.firstName ? `Ciao ${fields.firstName},` : 'Ciao!'}</h4>
        <br />
        ${message}
      `,
    }),
  });
};
