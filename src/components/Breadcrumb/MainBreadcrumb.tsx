import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HomeIcon from '@mui/icons-material/Home';
import { AppBar, Box, Toolbar, Typography, useTheme } from '@mui/material';
import Link from 'next/link';

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
            borderRadius: '12px'
          }}
        >
          <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
            {currentPage}
          </Typography>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <Link href={navigation.basePath}>
              <HomeIcon sx={{ color: theme.palette.secondary.main, cursor: 'pointer' }} />
            </Link>
            <ArrowForwardIosIcon sx={{ color: theme.palette.dark[200] }} />
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
