import React from 'react';
import { Box } from '@mui/material';

import LogoSection from '../../LogoSection';
import ProfileSection from '../ProfileSection';

const HeaderPermision = () => (
  <>
    <Box
      sx={(theme) => ({
        width: 228,
        display: 'flex',
        [theme.breakpoints.down('md')]: { width: 'auto' }
      })}
    >
      <Box component="span" sx={{ display: { md: 'block' }, flexGrow: 1 }}>
        <LogoSection />
      </Box>
    </Box>
    <Box sx={{ flexGrow: 1 }} />
    <Box sx={{ flexGrow: 1 }} />
    <Box sx={{ display: { sm: 'block' } }}>
      <ProfileSection />
    </Box>
  </>
);

export default HeaderPermision;
