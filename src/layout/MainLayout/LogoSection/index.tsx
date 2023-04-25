import React from 'react';
import { Link as MuiLink,Typography, useTheme } from '@mui/material';
import { DASHBOARD_PATH } from 'config';
import Link from 'next/link';
import { margins } from 'themes/themeConstants';

const LogoSection = () => {
  const theme = useTheme();

  return (
    <MuiLink underline="none" component={Link} href={DASHBOARD_PATH}>
      <div style={{ display: 'flex' }}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: 'Lora',
            fontWeight: 700
          }}
          color={theme.palette.primary[800]}
          my={margins.topBottom4}
          ml={margins.left0}
          mr={margins.right4}
        >
          Pollin Portal
        </Typography>
      </div>
    </MuiLink>
  );
};

export default LogoSection;
