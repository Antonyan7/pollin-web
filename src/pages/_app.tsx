import React from 'react';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import Main from 'pages';
import ThemeCustomization from 'themes';

import { NavigationScroll } from '../components';
import store from '../redux/store';

import '@assets/scss/style.scss';

const Pollin = ({ Component, pageProps }: AppProps) => (
  <ThemeCustomization>
    <Provider store={store}>
      <NavigationScroll>
        <Main>
          <Component {...pageProps} />
        </Main>
      </NavigationScroll>
    </Provider>
  </ThemeCustomization>
);

export default Pollin;
