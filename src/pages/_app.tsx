import 'utils/i18n';

import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { CacheProvider, EmotionCache } from '@emotion/react';
import FlagsProvider from 'HOCs/FlagProvider/FlagsProvider';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import ThemeCustomization from 'themes';

import { createEmotionCache } from '@utils/createEmotionCache';

import store from '../redux/store';

import '@assets/scss/style.scss';

const clientSideEmotionCache = createEmotionCache();

type PollinAppProps = AppProps & {
  emotionCache: EmotionCache;
  Component: AppProps['Component'] & {
    PageLayout?: React.ComponentState;
  };
};

const SafeHydrate = ({ children }: PropsWithChildren) => (
  <div suppressHydrationWarning>{typeof window === 'undefined' ? null : children}</div>
);

const DynamicPollin = dynamic(() => import('./Pollin'), {
  ssr: false
});

const App = ({ emotionCache = clientSideEmotionCache, ...props }: PollinAppProps) => (
  <SafeHydrate>
    <CacheProvider value={emotionCache}>
      <ThemeCustomization>
        <Provider store={store}>
          <FlagsProvider>
            <DynamicPollin emotionCache={emotionCache} {...props} />
          </FlagsProvider>
        </Provider>
      </ThemeCustomization>
    </CacheProvider>
  </SafeHydrate>
);

export default App;
