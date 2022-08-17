import React, { PropsWithChildren } from 'react';
import { Box, styled, Theme, useTheme } from '@mui/material';

interface MainStyleProps {
  theme: Theme;
}

const Main = styled('main')(({ theme }: MainStyleProps) => ({
  ...theme.typography.mainContent,
  backgroundColor: theme.palette.common.white
}));

const AppointmentsContent = ({ children }: PropsWithChildren) => {
  const theme = useTheme();

  return (
    <Box sx={{ marginTop: '-50px' }}>
      <Main theme={theme}>{children}</Main>
    </Box>
  );
};

export default AppointmentsContent;
