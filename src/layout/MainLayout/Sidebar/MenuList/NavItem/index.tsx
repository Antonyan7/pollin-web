import { forwardRef, ForwardRefExoticComponent, RefAttributes, useEffect } from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { dispatch, useAppSelector } from 'redux/hooks';
import { activeItem, openDrawer } from 'redux/slices/menu';
import { LinkTarget, NavItemType } from 'types';

import { Link } from '../../../../../components';

interface NavItemProps {
  item: NavItemType;
  level: number;
}

const NavItem = ({ item, level }: NavItemProps) => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

  const { openItem } = useAppSelector((state) => state.menu);

  const Icon = item?.icon!;
  const itemIcon = item?.icon ? (
    <Icon color="black" />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: openItem.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
        height: openItem.findIndex((id) => id === item?.id) > -1 ? 8 : 6
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  let itemTarget: LinkTarget['target'] = '_self';

  if (item.target) {
    itemTarget = '_blank';
  }

  let listItemProps: {
    component: ForwardRefExoticComponent<RefAttributes<HTMLAnchorElement>> | string;
    href?: string;
    target?: LinkTarget['target'];
  } = {
    component: forwardRef((props, ref) => (
      <Link style={{ color: 'black' }} ref={ref} {...props} href={`${item.url!}`} target={itemTarget} />
    ))
  };

  if (item?.external) {
    listItemProps = { component: 'a', href: item.url, target: itemTarget };
  }

  const itemHandler = (id: string) => {
    dispatch(activeItem([id]));

    if (matchesSM) {
      dispatch(openDrawer(false));
    }
  };

  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split('/')
      .findIndex((id) => id === item.id);

    if (currentIndex > -1) {
      dispatch(activeItem([item.id!]));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      sx={{
        borderRadius: `8px`,
        mb: 0.5,
        alignItems: 'flex-start',
        py: level > 1 ? 1 : 1.25,
        pl: `${level * 24}px`,
        '&:hover': {
          background: '#7F8487'
        }
      }}
      selected={openItem?.findIndex((id) => id === item.id) > -1}
      onClick={() => itemHandler(item.id!)}
    >
      <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36, color: 'black' }}>{itemIcon}</ListItemIcon>
      <ListItemText
        primary={
          <Typography
            sx={{
              color: 'black'
            }}
            variant={openItem?.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'}
          >
            {item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography
              sx={{
                color: 'black'
              }}
              variant="caption"
              display="block"
              gutterBottom
            >
              {item.caption}
            </Typography>
          )
        }
      />
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

export default NavItem;
