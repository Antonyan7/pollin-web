import React from 'react';
import { Avatar, AvatarProps, Box, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconBell } from '@tabler/icons';
import { borders } from 'themes/themeConstants';

const StyledAvatar = styled(Avatar)<AvatarProps>(({ theme }) => ({
  ...theme.typography.commonAvatar,
  ...theme.typography.mediumAvatar,
  border: `${borders.solid1px}`,
  borderColor: theme.palette.primary.light,
  background: theme.palette.primary.light,
  color: theme.palette.primary.dark,
  transition: 'all .2s ease-in-out',
  '&:hover': {
    background: theme.palette.primary.dark,
    color: theme.palette.primary.light
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
