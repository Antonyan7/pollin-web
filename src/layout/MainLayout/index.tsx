import React, { useMemo } from 'react';
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { dispatch, useAppSelector } from 'redux/hooks';
import { openDrawer } from 'redux/slices/menu';

import Header from './Header';
import Sidebar from './Sidebar';

const MainLayout = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));

  const { drawerOpen } = useAppSelector((state) => state.menu);

  React.useEffect(() => {
    dispatch(openDrawer(!matchDownMd));
  }, [matchDownMd]);

  const header = useMemo(
    () => (
      <Toolbar>
        <Header />
      </Toolbar>
    ),
    []
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: drawerOpen ? theme.transitions.create('width') : 'none'
        }}
      >
        {header}
      </AppBar>

      {/* drawer */}
      <Sidebar />

      {/* main content */}
      {/* <Main theme={theme} open={drawerOpen}> */}
      {/* breadcrumb */}
      {/* {children} */}
      {/* </Main> */}
    </Box>
  );
};

export default MainLayout;
