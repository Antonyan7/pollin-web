import * as Sentry from '@sentry/nextjs';

import { getEnvironmentVariables } from '@utils/getEnvironmentVariables';

const { NEXT_PUBLIC_SENTRY_DSN, NEXT_PUBLIC_SENTRY_ENVIRONMENT } = getEnvironmentVariables();

Sentry.init({
  dsn: NEXT_PUBLIC_SENTRY_DSN ?? 'URL',
  tracesSampleRate: 1.0,
  environment: NEXT_PUBLIC_SENTRY_ENVIRONMENT
});
