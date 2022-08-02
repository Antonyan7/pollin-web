import React from 'react';
import { Avatar, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconCheckbox } from '@tabler/icons';

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
      <Avatar
        variant="rounded"
        sx={{
          ...theme.typography.commonAvatar,
          ...theme.typography.mediumAvatar,
          border: '1px solid',
          borderColor: theme.palette.primary.light,
          background: '#C4C4C4',
          color: theme.palette.primary.dark,
          transition: 'all .2s ease-in-out',
          '&:hover': {
            background: '#7F8487'
          }
        }}
        aria-haspopup="true"
        color="inherit"
      >
        <IconCheckbox stroke={1.5} size="1.3rem" color="black" />
      </Avatar>
    </Box>
  );
};

export default CheckSection;
