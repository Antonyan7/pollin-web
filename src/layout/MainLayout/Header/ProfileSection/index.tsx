import React from 'react';
import { Avatar, AvatarProps, Chip, ChipProps } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { IconSettings } from '@tabler/icons';

const StyledChip = styled(Chip)<ChipProps>(({ theme }) => ({
  height: '48px',
  alignItems: 'center',
  borderRadius: '27px',
  transition: 'all .2s ease-in-out',
  borderColor: theme.palette.primary.light,
  backgroundColor: theme.palette.primary.light,
  '&[aria-controls="menu-list-grow"], &:hover': {
    borderColor: theme.palette.primary.main,
    background: theme.palette.primary.main,
    color: theme.palette.primary.light,
    '& svg': {
      stroke: theme.palette.primary.light
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
      icon={<StyledAvatar src="" theme={theme} aria-haspopup="true" />}
      label={<IconSettings stroke={1.5} size="1.5rem" />}
      variant="outlined"
      aria-haspopup="true"
    />
  );
};

export default ProfileSection;
