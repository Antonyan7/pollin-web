import React, { useEffect, useState } from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListProps,
  styled,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconChevronDown, IconChevronUp } from '@tabler/icons';
import { useRouter } from 'next/router';
import { margins } from 'themes/themeConstants';
import { NavGroupProps } from 'types';

import NavItem from '../NavItem';

interface NavCollapseProps {
  menu: NavGroupProps['item'];
  level: number;
}

const StyledList = styled(List)<ListProps>(({ theme }) => ({
  position: 'relative',
  '&:after': {
    content: "''",
    position: 'absolute',
    left: '32px',
    top: 0,
    height: '100%',
    width: '1px',
    opacity: 1,
    background: theme.palette.primary.light
  }
}));

const StyledListItemButton = styled(ListItemButton, { shouldForwardProp: (prop) => prop !== 'level' })<{
  level: number;
}>(({ level }) => ({
  borderRadius: `8px`,
  mb: 0.5,
  alignItems: 'flex-start',
  backgroundColor: level > 1 ? 'transparent' : 'inherit',
  py: level > 1 ? 1 : 1.25,
  pl: `${level * 24}px`
}));

const NavCollapse = ({ menu, level }: NavCollapseProps) => {
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = () => {
    setOpen(!open);
    setSelected(!selected ? menu.id : null);
  };

  const { pathname } = useRouter();

  useEffect(() => {
    const children = menu.children ? menu.children : [];

    children.forEach((item: NavGroupProps['item']) => {
      if (pathname && pathname.includes('product-details')) {
        if (item.url && item.url.includes('product-details')) {
          setOpen(true);
        }
      }

      if (item.url === pathname) {
        setOpen(true);
      }
    });
  }, [pathname, menu.children]);

  const menus = menu.children?.map((item) => {
    switch (item.type) {
      case 'collapse':
        return <NavCollapse key={item.id} menu={item} level={level + 1} />;
      case 'item':
        return <NavItem key={item.id} item={item} level={level + 1} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  const menuIcon = menu.icon ? (
    <menu.icon strokeWidth={1.5} style={{ marginTop: margins.auto, marginBottom: margins.auto }} />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: selected === menu.id ? 8 : 6,
        height: selected === menu.id ? 8 : 6
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  return (
    <>
      <StyledListItemButton selected={selected === menu.id} onClick={handleClick} level={level}>
        <ListItemIcon sx={{ my: 'auto', minWidth: !menu.icon ? 18 : 36 }}>{menuIcon}</ListItemIcon>
        <ListItemText
          primary={
            <Typography variant={selected === menu.id ? 'h5' : 'body1'} color="inherit" sx={{ my: 'auto' }}>
              {menu.title}
            </Typography>
          }
          secondary={
            menu.caption && (
              <Typography variant="caption" display="block" gutterBottom>
                {menu.caption}
              </Typography>
            )
          }
        />
        {open ? (
          <IconChevronUp stroke={1.5} size="1rem" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
        ) : (
          <IconChevronDown stroke={1.5} size="1rem" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
        )}
      </StyledListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {open && (
          <StyledList disablePadding theme={theme}>
            {menus}
          </StyledList>
        )}
      </Collapse>
    </>
  );
};

export default NavCollapse;
