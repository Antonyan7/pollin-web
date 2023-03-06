import React, { PropsWithChildren, useEffect, useMemo } from 'react';
import { ModalsController } from '@components/ModalsController/ModalsController';
import { ToastNotificationsController } from '@components/ModalsController/ToastNotificationsController';
import RedirectionHandler from '@components/RedirectionHandler/RedirectionHandler';
import { AppBar, Box, CssBaseline, styled, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { coreMiddleware } from '@redux/slices/core';
import { userSelector } from '@redux/slices/user';
import { useRouter } from 'next/router';
import { dispatch, useAppSelector } from 'redux/hooks';
import { viewsMiddleware, viewsSelector } from 'redux/slices/views';
import { drawerWidth, margins, paddings } from 'themes/themeConstants';
import { MainStyleProps } from 'types';

import AccessDeniedContent from '../../pages/access-denied';

import Login from './Login/Login';
import Header from './Header';
import Sidebar from './Sidebar';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }: MainStyleProps) => ({
  ...theme.typography.mainContent,
  backgroundColor: '#EDEFF1',
  whiteSpace: 'pre-line',
  ...(!open && {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter
    }),
    [theme.breakpoints.up('md')]: {
      marginLeft: -(drawerWidth - 20),
      width: `calc(100% - ${drawerWidth}px)`
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: margins.left20,
      width: `calc(100% - ${drawerWidth}px)`,
      padding: paddings.all16
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: margins.left12,
      width: `calc(100% - ${drawerWidth}px)`,
      padding: paddings.all16,
      marginRight: margins.right12,
      paddingTop: paddings.top40
    }
  }),
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.shorter
    }),
    marginLeft: margins.left0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: `calc(100% - ${drawerWidth}px)`,
    [theme.breakpoints.down('md')]: {
      marginLeft: margins.left20
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: margins.left12
    }
  })
}));

const PortalHeader = () => (
  <Toolbar>
    <Header />
  </Toolbar>
);

const PortalDefaultContent = ({ children }: PropsWithChildren) => {
  const { drawerOpen } = useAppSelector(viewsSelector.menu);
  const theme = useTheme();

  return (
    <Main theme={theme} open={drawerOpen}>
      {children}
    </Main>
  );
};

const PortalContent = ({ children }: PropsWithChildren) => {
  const { drawerOpen } = useAppSelector(viewsSelector.menu);
  const theme = useTheme();

  return (
    <>
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          transition: drawerOpen ? theme.transitions.create('width') : 'none'
        }}
      >
        <PortalHeader />
      </AppBar>
      <Sidebar />
      <Main theme={theme} open={drawerOpen}>
        {children}
      </Main>
    </>
  );
};

const LayoutContent = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const user = useAppSelector(userSelector.user);
  const isUserDisabled = useAppSelector(userSelector.isUserDisabled);
  const isSignedIn = useMemo(() => !!user, [user]);

  const isAccessDenied = router.pathname === '/access-denied';

  if (isAccessDenied || isUserDisabled) {
    return (
      <PortalDefaultContent>
        <AccessDeniedContent />
      </PortalDefaultContent>
    );
  }

  if (!isSignedIn) {
    return <Login />;
  }

  return <PortalContent>{children}</PortalContent>;
};

const MainLayout = ({ children }: PropsWithChildren) => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));
  const router = useRouter();
  const isAuthChecked = useAppSelector(userSelector.isAuthChecked);

  useEffect(() => {
    dispatch(viewsMiddleware.openMenuDrawer(!matchDownMd));
  }, [matchDownMd]);

  useEffect(() => {
    if (router.asPath !== router.pathname) {
      router.push(router.asPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(coreMiddleware.getClinicConfig());
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <RedirectionHandler />
      {isAuthChecked ? <LayoutContent>{children}</LayoutContent> : null}
      <ModalsController key="modals" />
      <ToastNotificationsController key="toasts" />
    </Box>
  );
};

export default MainLayout;
