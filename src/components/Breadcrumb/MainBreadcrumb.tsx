import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HomeIcon from '@mui/icons-material/Home';
import { AppBar, Box, styled, Toolbar, Typography, TypographyProps, useTheme } from '@mui/material';
import Link from 'next/link';

interface INavigationItem {
  name: string;
  path: string;
}

interface IMainBreadcrumb {
  currentPage: string;
  navigation: {
    basePath: string;
    items: INavigationItem[];
  };
}

const StyledBreadcrumbParagraph = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: '16px',
  lineHeight: '20px',
  color: theme.palette.grey[800],
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center'
}));

const MainBreadcrumb = (props: IMainBreadcrumb) => {
  const theme = useTheme();
  const { currentPage, navigation } = props;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} position="static" color="transparent">
        <Toolbar
          sx={{
            backgroundColor: theme.palette.common.white,
            borderRadius: '7px',
            border: `1px solid ${theme.palette.dark[200]}`
          }}
        >
          <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
            {currentPage}
          </Typography>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <Link href={navigation.basePath}>
              <HomeIcon sx={{ color: theme.palette.common.black, cursor: 'pointer' }} />
            </Link>
            <ArrowForwardIosIcon sx={{ color: theme.palette.dark[200] }} />
            {navigation.items.map((page: INavigationItem, index: number) => (
              <>
                {index > 0 && (
                  <ArrowForwardIosIcon
                    sx={{
                      color: theme.palette.grey[800],
                      fontSize: '18px'
                    }}
                  />
                )}
                <Link href={page.path}>
                  <StyledBreadcrumbParagraph
                    sx={{
                      fontSize: '16px',
                      lineHeight: '20px',
                      color: theme.palette.grey[800],
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    variant="h3"
                  >
                    {page.name}
                  </StyledBreadcrumbParagraph>
                </Link>
              </>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MainBreadcrumb;
