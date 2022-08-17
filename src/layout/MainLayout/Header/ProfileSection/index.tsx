import React from 'react';
import { Avatar, AvatarProps, Chip, ChipProps } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { IconSettings } from '@tabler/icons';

const StyledChip = styled(Chip)<ChipProps>(({ theme }) => ({
  height: '48px',
  alignItems: 'center',
  borderRadius: '27px',
  margin: '0px 15px',
  transition: 'all .2s ease-in-out',
  borderColor: theme.palette.dark[200],
  backgroundColor: theme.palette.dark[200],
  color: 'black',
  '&:hover': {
    background: theme.palette.dark[100],
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
      icon={<StyledAvatar src="" theme={theme} aria-haspopup="true" color={theme.palette.common.black} />}
      label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.common.black} />}
      variant="outlined"
      aria-haspopup="true"
    />
  );
};

export default ProfileSection;
