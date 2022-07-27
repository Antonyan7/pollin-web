import React from 'react';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import ThemeCustomization from 'themes';

import store from '../redux/store';

const Pollin = ({ Component, pageProps }: AppProps) => (
  <ThemeCustomization>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </ThemeCustomization>
);

export default Pollin;
