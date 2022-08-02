// material-ui
import { Avatar, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// assets
import { IconMenu2 } from '@tabler/icons';
// redux
import { dispatch, useAppSelector } from 'redux/hooks';
import { openDrawer } from 'redux/slices/menu';

// project imports
import LogoSection from '../LogoSection';

import CheckSection from './CheckSection';
import NotificationSection from './NotificationSection';
import ProfileSection from './ProfileSection';
import SearchSection from './SearchSection';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

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
        <Avatar
          variant="rounded"
          sx={{
            ...theme.typography.commonAvatar,
            ...theme.typography.mediumAvatar,
            overflow: 'hidden',
            transition: 'all .2s ease-in-out',
            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : '#C4C4C4',
            color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : 'black',
            '&:hover': {
              background: theme.palette.mode === 'dark' ? theme.palette.secondary.main : '#7F8487',
              color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : 'black'
            }
          }}
          onClick={() => dispatch(openDrawer(!drawerOpen))}
          color="inherit"
        >
          <IconMenu2 stroke={1.5} size="1.3rem" />
        </Avatar>
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
