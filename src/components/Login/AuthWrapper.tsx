import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FirebaseManager } from '@axios/firebase';
import { Box, Button, Grid, styled, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';

// import Image from 'next/image';
import MainCard, { MainCardProps } from '@ui-component/cards/MainCard';

// import Svg from '../../assets/icons/GoogleIcon.svg';

interface AuthLoginProps {
  accountExists: boolean;
}

export const GoogleAuthWrapper = ({ children, ...other }: MainCardProps) => (
  <MainCard
    sx={{
      width: { xs: 500 },
      height: { xs: 500 },
      display: 'flex',
      justifyContent: 'center'
    }}
    {...other}
  >
    <Box sx={{ p: { xs: 2, sm: 3, xl: 5 }, height: 'inherit' }}>{children}</Box>
  </MainCard>
);

export const AuthWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  display: 'flex',
  alignItems: 'center',
  height: '100vh',
  width: '100vw'
}));

export const AuthLogin = ({ accountExists }: AuthLoginProps) => {
  const theme = useTheme();
  const [t] = useTranslation();

  const onLoginClick = useCallback(() => {
    FirebaseManager.login();
  }, []);

  return (
    <Grid container direction="column" justifyContent="center">
      <Grid item xs={12}>
        <Button
          disableElevation
          fullWidth
          size="large"
          variant="outlined"
          onClick={onLoginClick}
          sx={{
            color: theme.palette.grey[700],
            backgroundColor: theme.palette.grey[50],
            borderColor: theme.palette.primary.light
          }}
        >
          <Box sx={{ mr: 2, width: 20, height: 20 }}>
            {/* 
              TODO fix: TEAMA-5494
              <Image src={Svg} alt="profile image" /> 
            */}
          </Box>
          {accountExists ? t(Translation.GOOGLE_SIGN_IN_BUTTON) : t(Translation.GOOGLE_SIGN_UP_BUTTON)}
        </Button>
      </Grid>
    </Grid>
  );
};
