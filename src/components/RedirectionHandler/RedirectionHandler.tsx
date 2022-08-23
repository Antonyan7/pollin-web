import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { dispatch, useAppSelector } from 'redux/hooks';
import { viewsMiddleware, viewsSelector } from 'redux/slices/views';

const RedirectionHandler = () => {
  const redirection = useAppSelector(viewsSelector.redirection);
  const router = useRouter();

  useEffect(() => {
    console.warn({
      appVersion: process.env.NEXT_PUBLIC_APP_VERSION
    });

    if (redirection.apply) {
      dispatch(
        viewsMiddleware.setRedirectionState({
          ...redirection,
          apply: false
        })
      );

      const finalPath = redirection.path + (redirection.params ? `?${redirection.params}` : '');

      router.push(`${finalPath}`, undefined, { shallow: true });
    }
  }, [router, redirection]);

  return null;
};

export default RedirectionHandler;
