import 'utils/i18n';

import React, { useEffect } from 'react';
import { FirebaseManager } from '@axios/firebase';
import { EmotionCache } from '@emotion/react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Main from 'pages';

import { NavigationScroll } from '../components';

export type PollinAppProps = AppProps & {
  emotionCache: EmotionCache;
  Component: AppProps['Component'] & {
    PageLayout?: React.ComponentState;
  };
};

export const Pollin = ({ Component, pageProps }: PollinAppProps) => {
  useEffect(() => {
    FirebaseManager.initiate();
  }, []);

  return (
    <NavigationScroll>
      <Main>
        {Component.PageLayout ? (
          <Component.PageLayout>
            <Component {...pageProps} />
          </Component.PageLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </Main>
    </NavigationScroll>
  );
};

const Default = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, [router]);

  return null;
};

export default Default;
