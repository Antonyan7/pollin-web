import React, { useCallback } from 'react';
import { Avatar, AvatarProps, Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { IconSettings } from '@tabler/icons';
import { dispatch } from 'redux/hooks';
import { viewsMiddleware } from 'redux/slices/views';
import { borders } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

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

const DevSection = () => {
  const theme = useTheme();

  const onClick = useCallback(() => {
    dispatch(
      viewsMiddleware.openModal({
        name: ModalName.DevToolsModal,
        props: null
      })
    );
  }, []);

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
          <IconSettings stroke={1.5} size="1.3rem" onClick={onClick} colorProfile={theme.palette.error[100]} />
        </StyledAvatar>
      </Box>
    </Box>
  );
};

export default DevSection;
