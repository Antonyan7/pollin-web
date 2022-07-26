import React from 'react';
import type { AppProps } from 'next/app';
import ThemeCustomization from 'themes';

const Pollin = ({ Component, pageProps }: AppProps) => (
  <ThemeCustomization>
    <Component {...pageProps} />
  </ThemeCustomization>
);

export default Pollin;
