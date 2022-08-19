import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { dispatch, useAppSelector } from 'redux/hooks';
import { setRedirection } from 'redux/slices/redirection';

const RedirectionHandler = () => {
  const redirection = useAppSelector((state) => state.redirection);
  const router = useRouter();

  useEffect(() => {
    if (redirection.apply) {
      dispatch(
        setRedirection({
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
