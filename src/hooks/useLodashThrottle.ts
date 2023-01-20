import { useEffect, useMemo } from 'react';
import throttle from 'lodash.throttle';

export const useLodashThrottle: typeof throttle = (
  handler,
  wait = 1000,
  options = {
    leading: false,
    trailing: true
  }
) => {
  const throttleFn = useMemo(
    () =>
      throttle(handler, wait, {
        leading: options.leading,
        trailing: options.trailing
      }),
    [handler, wait, options.leading, options.trailing]
  );

  useEffect(
    () => () => {
      throttleFn.cancel();
    },
    [throttleFn]
  );

  return throttleFn;
};
