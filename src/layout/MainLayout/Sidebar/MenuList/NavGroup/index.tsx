import React from 'react';
import { Divider, List, Typography, useTheme } from '@mui/material';
import { margins, paddings } from 'themes/themeConstants';
import { NavGroupProps } from 'types';

import NavCollapse from '../NavCollapse';
import NavItem from '../NavItem';

const NavGroup = ({ item, isLastItem }: NavGroupProps) => {
  const theme = useTheme();

  const items = item.children?.map((menu) => {
    switch (menu.type) {
      case 'collapse':
        return <NavCollapse key={menu.id} menu={menu} level={1} />;
      case 'item':
        return <NavItem key={menu.id} item={menu} level={1} />;
      default:
        return (
          <Typography key={menu.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return (
    <>
      <List
        subheader={
          item.title && (
            <Typography variant="caption" sx={{ ...theme.typography.menuCaption }} display="block" gutterBottom>
              {item.title}
              {item.caption && (
                <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                  {item.caption}
                </Typography>
              )}
            </Typography>
          )
        }
      >
        {items}
      </List>
      {!isLastItem ? (
        <Divider sx={{ mt: margins.top8, mb: margins.bottom12 }} />
      ) : (
        <Typography
          sx={{
            textAlign: 'center',
            color: theme.palette.primary.light,
            pt: paddings.top8
          }}
        >
          v1.0.0
        </Typography>
      )}
    </>
  );
};

export default NavGroup;
