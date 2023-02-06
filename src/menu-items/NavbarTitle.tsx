import React, { PropsWithChildren } from 'react';
import { Typography } from '@mui/material';

const NavbarTitle: React.FC<PropsWithChildren> = ({ children }) => (
  <Typography variant="h4" component="h4">
    {children}
  </Typography>
);

export default NavbarTitle;
