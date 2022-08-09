import React from 'react';
import { Avatar, AvatarProps, Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { IconCheckbox } from '@tabler/icons';

import cssVariables from 'assets/scss/_themes-vars.module.scss';

const StyledAvatar = styled(Avatar)<AvatarProps>(({ theme }) => ({
  ...theme.typography.commonAvatar,
  ...theme.typography.mediumAvatar,
  border: '1px solid',
  borderColor: theme.palette.primary.light,
  background: cssVariables.normalBackgroundDark,
  color: theme.palette.primary.dark,
  transition: 'all .2s ease-in-out',
  '&:hover': {
    background: cssVariables.hoverBackgroundDark
  }
}));

const CheckSection = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ml: 2,
        [theme.breakpoints.down('md')]: {
          ml: 1
        }
      }}
    >
      <StyledAvatar variant="rounded" theme={theme} aria-haspopup="true" color="inherit">
        <IconCheckbox stroke={1.5} size="1.3rem" color={cssVariables.paperDark} />
      </StyledAvatar>
    </Box>
  );
};

export default CheckSection;
