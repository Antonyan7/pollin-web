import React from 'react';
import { Avatar, AvatarProps, Box, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconMenu2 } from '@tabler/icons';
import { dispatch, useAppSelector } from 'redux/hooks';
import { viewsMiddleware, viewsSelector } from 'redux/slices/views';

import { useFlags } from '@hooks/useFlagsHook';
import { getEnvironmentVariables } from '@utils/getEnvironmentVariables';

import LogoSection from '../LogoSection';

import CheckSection from './CheckSection';
import DevSection from './DevSection';
import NotificationSection from './NotificationSection';
import ProfileSection from './ProfileSection';
import SearchSection from './SearchSection';
import TaskDashboard from './TaskDashboard';

const StyledAvatar = styled(Avatar)<AvatarProps>(({ theme }) => ({
  ...theme.typography.commonAvatar,
  ...theme.typography.mediumAvatar,
  overflow: 'hidden',
  transition: 'all .2s ease-in-out',
  background: theme.palette.secondary.light,
  color: theme.palette.secondary.dark,
  '&:hover': {
    background: theme.palette.secondary.dark,
    color: theme.palette.secondary.light
  }
}));

const { NEXT_PUBLIC_ENVIRONMENT } = getEnvironmentVariables();
const Header = () => {
  const theme = useTheme();
  const { drawerOpen } = useAppSelector(viewsSelector.menu);
  const { DOMAIN_TASK_MANAGEMENT } = useFlags();

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
        <Box component="span" sx={{ display: { md: 'block' }, flexGrow: 1 }}>
          <LogoSection />
        </Box>
        <StyledAvatar
          variant="rounded"
          onClick={() => dispatch(viewsMiddleware.openMenuDrawer(!drawerOpen))}
          color="inherit"
        >
          <IconMenu2 stroke={1.5} size="1.3rem" />
        </StyledAvatar>
      </Box>

      <SearchSection />
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />
      {NEXT_PUBLIC_ENVIRONMENT === 'dev' ? <DevSection /> : null}
      <Box sx={{ display: { sm: 'block' } }}>
        <CheckSection />
      </Box>
      <Box sx={{ display: { sm: 'block' } }}>
        <NotificationSection />
      </Box>
      <Box sx={{ display: { sm: 'block' } }}>{DOMAIN_TASK_MANAGEMENT ? <TaskDashboard /> : null}</Box>
      <Box sx={{ display: { sm: 'block' } }}>
        <ProfileSection />
      </Box>
    </>
  );
};

export default Header;
