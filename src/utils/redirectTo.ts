import { getCurrentBaseUrl } from './getCurrentBaseUrl';

export const redirectTo = (to: string): void => {
  const baseUrl = getCurrentBaseUrl();

  window.location.href = `${baseUrl}${to}`;
};
