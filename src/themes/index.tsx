import React, { ReactNode, useMemo } from 'react';
// material-ui
import { createTheme, CssBaseline, Theme, ThemeOptions, ThemeProvider } from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import defaultConfig from 'config';
import { CustomizationProps } from 'types/config';
// types
import { CustomShadowProps } from 'types/default-theme';

import componentStyleOverrides from './compStyleOverride';
import Palette from './palette';
import customShadows from './shadows';
import { paddings } from './themeConstants';
import Typography from './typography';

interface Props {
  children: ReactNode;
}

const stylesConfig: CustomizationProps = {
  ...defaultConfig
};

export default ({ children }: Props) => {
  const { borderRadius, fontFamily, navType, outlinedFilled, presetColor, rtlLayout } = stylesConfig;

  const theme: Theme = useMemo<Theme>(() => Palette(navType, presetColor), [navType, presetColor]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const themeTypography: TypographyOptions = useMemo<TypographyOptions>(
    () => Typography(theme, borderRadius, fontFamily),
    [theme, borderRadius, fontFamily]
  );
  const themeCustomShadows: CustomShadowProps = useMemo<CustomShadowProps>(
    () => customShadows(navType, theme),
    [navType, theme]
  );

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      direction: rtlLayout ? 'rtl' : 'ltr',
      palette: theme.palette,
      mixins: {
        toolbar: {
          minHeight: '48px',
          padding: paddings.all16,
          '@media (min-width: 600px)': {
            minHeight: '48px'
          }
        }
      },
      typography: themeTypography,
      customShadows: themeCustomShadows
    }),
    [rtlLayout, theme, themeCustomShadows, themeTypography]
  );

  const themes: Theme = createTheme(themeOptions);

  themes.components = useMemo(
    () => componentStyleOverrides(themes, borderRadius, outlinedFilled),
    [themes, borderRadius, outlinedFilled]
  );

  return (
    <ThemeProvider theme={themes}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
