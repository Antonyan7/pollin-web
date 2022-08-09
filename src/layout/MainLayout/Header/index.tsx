import React from 'react';
import { Avatar, AvatarProps, Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { IconMenu2 } from '@tabler/icons';
import { dispatch, useAppSelector } from 'redux/hooks';
import { openDrawer } from 'redux/slices/menu';

import cssVariables from '@assets/scss/_themes-vars.module.scss';

import LogoSection from '../LogoSection';

import CheckSection from './CheckSection';
import NotificationSection from './NotificationSection';
import ProfileSection from './ProfileSection';
import SearchSection from './SearchSection';

const StyledAvatar = styled(Avatar)<AvatarProps>(({ theme }) => ({
  ...theme.typography.commonAvatar,
  ...theme.typography.mediumAvatar,
  overflow: 'hidden',
  transition: 'all .2s ease-in-out',
  background: cssVariables.normalBackgroundDark,
  color: 'black',
  '&:hover': {
    background: cssVariables.hoverBackgroundDark,
    color: 'black'
  }
}));

const Header = () => {
  const theme = useTheme();
  const { drawerOpen } = useAppSelector((state) => state.menu);

  return (
    <>
      <Box
        sx={{
          width: 228,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          }
        }}
      >
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
          <LogoSection />
        </Box>
        <StyledAvatar variant="rounded" onClick={() => dispatch(openDrawer(!drawerOpen))} color="inherit">
          <IconMenu2 stroke={1.5} size="1.3rem" />
        </StyledAvatar>
      </Box>

      <SearchSection />
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <CheckSection />
      </Box>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <NotificationSection />
      </Box>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <ProfileSection />
      </Box>
    </>
  );
};

export default Header;
