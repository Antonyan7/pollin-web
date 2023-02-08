import React, { memo } from 'react';
import { Box, Typography } from '@mui/material';
import menuItem from 'menu-items';

import NavGroup from './NavGroup';

const MenuList = () => {
  const navItems = menuItem.items.map((item, index) => {
    const isLastItem = index === menuItem.items.length - 1;

    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} isLastItem={isLastItem} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <Box>{navItems}</Box>;
};

export default memo(MenuList);
