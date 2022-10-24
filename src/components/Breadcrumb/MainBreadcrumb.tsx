import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import { AppBar, Box, Toolbar, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import { borderRadius, margins } from 'themes/themeConstants';

import { IBreadcrumbNavigationItem, IMainBreadcrumb } from './Breadcrumb';
import BreadcrumbNavItem from './BreadcrumbNavItem';

const MainBreadcrumb = (props: IMainBreadcrumb) => {
  const theme = useTheme();
  const { currentPage, navigation } = props;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} position="static" color="transparent">
        <Toolbar
          sx={{
            backgroundColor: theme.palette.common.white,
            borderRadius: borderRadius.radius12
          }}
        >
          <Typography variant="h2" component="div" sx={{ flexGrow: 1, marginRight: margins.right12 }}>
            {currentPage}
          </Typography>
          <Box sx={{ display: 'flex', gap: margins.all20 }}>
            <Link href={navigation.basePath}>
              <HomeIcon sx={{ color: theme.palette.primary.main, cursor: 'pointer' }} />
            </Link>
            {navigation.items.map((page: IBreadcrumbNavigationItem, index: number) => (
              <BreadcrumbNavItem key={`header-nav-${page.name}-${page.path}`} page={page} index={index} />
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MainBreadcrumb;
