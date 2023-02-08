import React, { useCallback } from 'react';
import { Avatar, AvatarProps, Box, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { borders } from 'themes/themeConstants';

import TaskDashboardIcon from '@assets/icons/TaskDashboardIcon';

const StyledAvatar = styled(Avatar)<AvatarProps>(({ theme }) => ({
  ...theme.typography.commonAvatar,
  ...theme.typography.mediumAvatar,
  border: `${borders.solid1px}`,
  borderColor: theme.palette.primary.light,
  background: theme.palette.primary.main,
  color: theme.palette.primary.dark,
  transition: 'all .2s ease-in-out',
  '&:hover': {
    background: theme.palette.primary.dark,
    color: theme.palette.primary.dark
  }
}));

const TaskDashboard = () => {
  const theme = useTheme();
  const router = useRouter();
  const onClick = useCallback(() => {
    router.push('/task-dashboard');
  }, [router]);

  return (
    <Box sx={{ display: { sm: 'block' } }}>
      <Box
        sx={{
          mr: 2,
          ml: 2,
          [theme.breakpoints.down('md')]: {
            ml: 1
          }
        }}
      >
        <StyledAvatar>
          <TaskDashboardIcon onClick={onClick} />
        </StyledAvatar>
      </Box>
    </Box>
  );
};

export default TaskDashboard;
