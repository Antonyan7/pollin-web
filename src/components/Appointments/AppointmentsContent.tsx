import React, { PropsWithChildren } from 'react';
import { Box, styled, Theme } from '@mui/material';

interface MainStyleProps {
  theme: Theme;
}

export const Main = styled('main')(({ theme }: MainStyleProps) => ({
  ...theme.typography.mainContent,
  backgroundColor: theme.palette.common.white
}));

const AppointmentsContent = ({ children }: PropsWithChildren) => (
  <Box sx={{ marginTop: '-68px' }}>
    <Main>{children}</Main>
  </Box>
);

export default AppointmentsContent;
