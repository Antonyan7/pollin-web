import React from 'react';
import { Link as MuiLink, Typography } from '@mui/material';
import { DASHBOARD_PATH } from 'config';

import cssVariables from '@assets/scss/_themes-vars.module.scss';

import { Link } from '../../../components';

const LogoSection = () => (
  <MuiLink underline="none" component={Link} href={DASHBOARD_PATH}>
    <div style={{ display: 'flex' }}>
      <Typography variant="h2" color={cssVariables.paperDark} margin="5px 5px 5px 0px">
        DANDELION
      </Typography>
    </div>
  </MuiLink>
);

export default LogoSection;
