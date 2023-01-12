import React, { memo, useMemo } from 'react';
import { Box, Drawer, styled, useMediaQuery } from '@mui/material';
// material-ui
import { useTheme } from '@mui/material/styles';
// redux
import { dispatch, useAppSelector } from 'redux/hooks';
import { viewsMiddleware, viewsSelector } from 'redux/slices/views';
import { drawerWidth, paddings } from 'themes/themeConstants';

import LogoSection from '../LogoSection';

// project imports
import MenuList from './MenuList';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    borderRight: 'none',
    [theme.breakpoints.up('md')]: {
      top: '88px'
    }
  }
}));

interface SidebarProps {
  window?: Window;
}

const Sidebar = ({ window }: SidebarProps) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const { drawerOpen } = useAppSelector(viewsSelector.menu);

  const logo = useMemo(
    () => (
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
          <LogoSection />
        </Box>
      </Box>
    ),
    []
  );

  const drawer = useMemo(
    () => (
      <Box
        sx={{
          height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
          overflow: 'auto',
          px: paddings.leftRight16
        }}
      >
        <MenuList />
      </Box>
    ),
    [matchUpMd]
  );

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }}
      aria-label="mailbox folders"
    >
      <StyledDrawer
        container={container}
        variant={matchUpMd ? 'persistent' : 'temporary'}
        anchor="left"
        open={drawerOpen}
        onClose={() => dispatch(viewsMiddleware.openMenuDrawer(!drawerOpen))}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        {drawerOpen && logo}
        {drawerOpen && drawer}
      </StyledDrawer>
    </Box>
  );
};

export default memo(Sidebar);
