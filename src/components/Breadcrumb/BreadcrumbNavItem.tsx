import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Typography, useTheme } from '@mui/material';
import Link from 'next/link';

import { IBreadcrumbNavItemProp } from './Breadcrumb';

const BreadcrumbNavItem = ({ page, index }: IBreadcrumbNavItemProp) => {
  const theme = useTheme();

  return (
    <>
      {index > 0 ? (
        <ArrowForwardIosIcon
          sx={{
            color: theme.palette.grey[800],
            fontSize: '18px'
          }}
        />
      ) : null}
      <Link href={page.path}>
        <Typography
          sx={{
            color: index ? theme.palette.secondary.main : theme.palette.common.black,
            fontSize: theme.typography.pxToRem(16),
            cursor: 'pointer'
          }}
          variant="h3"
        >
          {page.name}
        </Typography>
      </Link>
    </>
  );
};

export default BreadcrumbNavItem;
