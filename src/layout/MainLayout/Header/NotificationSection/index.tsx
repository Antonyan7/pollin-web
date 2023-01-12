import React from 'react';
import { Avatar, AvatarProps, Box, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconBell } from '@tabler/icons';

const StyledAvatar = styled(Avatar)<AvatarProps>(({ theme }) => ({
  ...theme.typography.commonAvatar,
  ...theme.typography.mediumAvatar,
  transition: 'all .2s ease-in-out',
  background: theme.palette.secondary.light,
  color: theme.palette.secondary.dark,
  '&[aria-controls="menu-list-grow"],&:hover': {
    background: theme.palette.secondary.dark,
    color: theme.palette.secondary.light
  }
}));

const NotificationSection = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ml: 2,
        mr: 2,
        [theme.breakpoints.down('md')]: {
          ml: 1
        }
      }}
    >
      <StyledAvatar variant="rounded" theme={theme} aria-haspopup="true">
        <IconBell stroke={1.5} size="1.3rem" />
      </StyledAvatar>
    </Box>
  );
};

export default NotificationSection;
