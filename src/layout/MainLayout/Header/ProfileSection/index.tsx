import React from 'react';
import { Avatar, AvatarProps, Chip, ChipProps } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { IconSettings } from '@tabler/icons';

import cssVariables from 'assets/scss/_themes-vars.module.scss';

const StyledChip = styled(Chip)<ChipProps>(({ theme }) => ({
  height: '48px',
  alignItems: 'center',
  borderRadius: '27px',
  margin: '0px 15px',
  transition: 'all .2s ease-in-out',
  borderColor: theme.palette.primary.light,
  backgroundColor: cssVariables.normalBackgroundDark,
  color: 'black',
  '&:hover': {
    background: cssVariables.hoverBackgroundDark,
    '& svg': {
      cursor: 'pointer'
    }
  },
  '& .MuiChip-label': {
    lineHeight: 0
  }
}));

const StyledAvatar = styled(Avatar)<AvatarProps>(({ theme }) => ({
  ...theme.typography.mediumAvatar,
  margin: '8px 0 8px 8px',
  cursor: 'pointer'
}));

const ProfileSection = () => {
  const theme = useTheme();

  return (
    <StyledChip
      theme={theme}
      icon={<StyledAvatar src="" theme={theme} aria-haspopup="true" color={cssVariables.paperDark} />}
      label={<IconSettings stroke={1.5} size="1.5rem" color={cssVariables.paperDark} />}
      variant="outlined"
      aria-haspopup="true"
    />
  );
};

export default ProfileSection;
