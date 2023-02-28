import { useEffect } from 'react';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { useRouter } from 'next/router';

const useStopRouteChange = (condition: boolean, action: () => void) => {
  const router = useRouter();

  useEffect(() => {
    const exitingFunction = () => {
      if (condition) {
        router.events.emit('routeChangeError');
        action();

        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw `routeChange aborted. This error can be safely ignored - https://github.com/zeit/next.js/issues/2476.`;
      } else {
        dispatch(viewsMiddleware.closeAllModals());
      }
    };

    router.events.on('routeChangeStart', exitingFunction);

    return () => {
      router.events.off('routeChangeStart', exitingFunction);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [condition, action]);
};

export default useStopRouteChange;
