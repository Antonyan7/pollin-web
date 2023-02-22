import * as Sentry from '@sentry/nextjs';

import { getEnvironmentVariables } from '@utils/getEnvironmentVariables';

const { NEXT_PUBLIC_SENTRY_DSN, NEXT_PUBLIC_SENTRY_ENVIRONMENT, NEXT_PUBLIC_ENVIRONMENT } = getEnvironmentVariables();

if (NEXT_PUBLIC_ENVIRONMENT === 'e2eTesting') {
  console.warn('Sentry initiation skipped, running in e2eTesting mode');
} else {
  Sentry.init({
    dsn: NEXT_PUBLIC_SENTRY_DSN ?? 'URL',
    tracesSampleRate: 1.0,
    environment: NEXT_PUBLIC_SENTRY_ENVIRONMENT
  });
}
