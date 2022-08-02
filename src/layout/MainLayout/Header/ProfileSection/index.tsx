import React from 'react';
import { Avatar, Chip, ChipProps } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { IconSettings } from '@tabler/icons';

const StyledChip = styled(Chip)<ChipProps>(({ theme }) => ({
  height: '48px',
  alignItems: 'center',
  borderRadius: '27px',
  margin: '0px 15px',
  transition: 'all .2s ease-in-out',
  borderColor: theme.palette.primary.light,
  backgroundColor: '#C4C4C4',
  color: 'black',
  '&:hover': {
    background: '#7F8487',
    '& svg': {
      cursor: 'pointer'
    }
  },
  '& .MuiChip-label': {
    lineHeight: 0
  }
}));

const ProfileSection = () => {
  const theme = useTheme();

  return (
    <StyledChip
      theme={theme}
      icon={
        <Avatar
          src=""
          sx={{
            ...theme.typography.mediumAvatar,
            margin: '8px 0 8px 8px !important',
            cursor: 'pointer'
          }}
          aria-haspopup="true"
          color="black"
        />
      }
      label={<IconSettings stroke={1.5} size="1.5rem" color="black" />}
      variant="outlined"
      aria-haspopup="true"
    />
  );
};

export default ProfileSection;
