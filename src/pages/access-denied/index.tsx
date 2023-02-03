import React from 'react';
import { useTranslation } from 'react-i18next';
import { AppBar, Grid, styled, Toolbar, Typography, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';
import Image from 'next/image';
import { borderRadius, margins } from 'themes/themeConstants';

import AccessDenied from '@assets/icons/AccessDenied/accessDenied.png';

import HeaderAccessDenied from '../../layout/MainLayout/Header/HeaderAccessDenied';

const Main = styled('main')(({ theme }) => ({
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  borderRadius: borderRadius.radius12,
  background: theme.palette.secondary[200]
}));

const AccessDeniedContent = () => {
  const theme = useTheme();
  const [t] = useTranslation();

  return (
    <AppBar enableColorOnDark position="fixed" color="inherit" elevation={0}>
      <Toolbar>
        <HeaderAccessDenied />
      </Toolbar>
      <Main theme={theme}>
        <Grid
          container
          direction="column"
          alignItems="center"
          sx={{
            borderRadius: borderRadius.radius12,
            height: '90vh',
            width: `calc(100% - ${40}px)`,
            background: theme.palette.common.white,
            margin: margins.all20
          }}
        >
          <Grid item>
            <Image src={AccessDenied} />
          </Grid>
          <Grid item>
            <Typography variant="h1">{t(Translation.PAGE_PERMISION_ACCESS)}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption" fontSize="1rem">
              {t(Translation.PAGE_PERMISION_ACCESS_CONTACT_YOUR_ADMINISTRATOR)}
            </Typography>
          </Grid>
        </Grid>
      </Main>
    </AppBar>
  );
};

export default AccessDeniedContent;
