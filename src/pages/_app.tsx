import 'utils/i18n';

import React from 'react';
import { Provider } from 'react-redux';
import { CacheProvider, EmotionCache } from '@emotion/react';
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
};

const Pollin = ({ Component, pageProps, emotionCache = clientSideEmotionCache }: PollinAppProps) => (
  <CacheProvider value={emotionCache}>
    <ThemeCustomization>
      <Provider store={store}>
        <NavigationScroll>
          <Main>
            <Component {...pageProps} />
          </Main>
        </NavigationScroll>
      </Provider>
    </ThemeCustomization>
  </CacheProvider>
);

export default Pollin;
