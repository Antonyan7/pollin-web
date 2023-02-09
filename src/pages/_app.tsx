import 'utils/i18n';

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { FirebaseManager } from '@axios/firebase';
import { CacheProvider, EmotionCache } from '@emotion/react';
import FlagsProvider from 'HOCs/FlagProvider/FlagsProvider';
import type { AppProps } from 'next/app';
import Main from 'pages';
import ThemeCustomization from 'themes';

import { createEmotionCache } from '@utils/createEmotionCache';

import { NavigationScroll } from '../components';
import store from '../redux/store';

import '@assets/scss/style.scss';

const clientSideEmotionCache = createEmotionCache();

type PollinAppProps = AppProps & {
  emotionCache: EmotionCache;
  Component: AppProps['Component'] & {
    PageLayout?: React.ComponentState;
  };
};

const Pollin = ({ Component, pageProps, emotionCache = clientSideEmotionCache }: PollinAppProps) => {
  useEffect(() => {
    FirebaseManager.initiate();
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeCustomization>
        <FlagsProvider>
          <Provider store={store}>
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
          </Provider>
        </FlagsProvider>
      </ThemeCustomization>
    </CacheProvider>
  );
};

export default Pollin;
