import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Divider, Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';
import LogoSection from 'layout/MainLayout/LogoSection';

import { AuthLogin, AuthWrapper, GoogleAuthWrapper } from './AuthWrapper';

const GoogleAuthLogin = () => {
  const [t] = useTranslation();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [accountExists, setAccountExists] = useState(true);
  const handleAccountClick = useCallback(() => {
    setAccountExists(!accountExists);
  }, [accountExists]);

  return (
    <AuthWrapper>
      <Grid container alignItems="center" direction="column">
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item container alignItems="center">
              <GoogleAuthWrapper>
                <Grid container spacing={4} alignItems="center" justifyContent="center">
                  <Grid item sx={{ mb: 3 }}>
                    <LogoSection />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="center">
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                          <Typography
                            color={theme.palette.secondary.main}
                            gutterBottom
                            variant={matchDownSM ? 'h3' : 'h2'}
                          >
                            {t(Translation.GOOGLE_LOGIN_TITLE)}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthLogin accountExists={accountExists} />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12} mt={2}>
                    <Grid item container direction="column" alignItems="center" xs={12}>
                      <Typography
                        variant="h5"
                        sx={{ '&:hover': { cursor: 'pointer', textDecoration: 'underline' }, fontSize: '18px' }}
                        onClick={handleAccountClick}
                      >
                        {t(Translation.DO_NOT_HAVE_AN_ACCOUNT)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </GoogleAuthWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default GoogleAuthLogin;
