import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { styled, Typography, TypographyProps, useTheme } from '@mui/material';
import Link from 'next/link';

import { IBreadcrumbNavItemProp } from './Breadcrumb';

const StyledBreadcrumbParagraph = styled(Typography)<TypographyProps>(() => ({
  fontSize: '16px',
  lineHeight: '20px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center'
}));

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
        <StyledBreadcrumbParagraph
          sx={{
            color: index ? theme.palette.grey[800] : theme.palette.secondary.main
          }}
          variant="h3"
        >
          {page.name}
        </StyledBreadcrumbParagraph>
      </Link>
    </>
  );
};

export default BreadcrumbNavItem;
