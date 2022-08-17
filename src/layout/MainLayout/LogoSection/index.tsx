import React from 'react';
import { Link as MuiLink, Typography, useTheme } from '@mui/material';
import { DASHBOARD_PATH } from 'config';

import { Link } from '../../../components';

const LogoSection = () => {
  const theme = useTheme();

  return (
    <MuiLink underline="none" component={Link} href={DASHBOARD_PATH}>
      <div style={{ display: 'flex' }}>
        <Typography variant="h2" color={theme.palette.common.black} margin="5px 5px 5px 0px">
          DANDELION
        </Typography>
      </div>
    </MuiLink>
  );
};

export default LogoSection;
