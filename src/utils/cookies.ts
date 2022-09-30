import { CookieKey } from 'constants/cookieKey';
import { getCookie, hasCookie, setCookie } from 'cookies-next';
import { OptionsType } from 'cookies-next/lib/types';

export const getFromCookie = <T>(key: CookieKey, defaultValue?: T) => {
  if (!hasCookie(key)) {
    return defaultValue;
  }

  const cookie = getCookie(key);

  try {
    if (typeof cookie === 'string') {
      return JSON.parse(cookie);
    }

    return cookie;
  } catch (error) {
    return cookie ?? defaultValue;
  }
};

export const setToCookie = <T>(key: CookieKey, value: T, options?: OptionsType) => {
  setCookie(key, value, options);
};
