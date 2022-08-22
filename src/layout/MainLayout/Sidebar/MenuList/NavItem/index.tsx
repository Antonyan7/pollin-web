import React, { forwardRef, ForwardRefExoticComponent, RefAttributes, useEffect } from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {
  Avatar,
  Chip,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { dispatch, useAppSelector } from 'redux/hooks';
import { viewsMiddleware, viewsSelector } from 'redux/slices/views';
import { LinkTarget, NavItemType } from 'types';

import { Link } from '../../../../../components';

interface NavItemProps {
  item: NavItemType;
  level: number;
}

const StyledListItemButton = styled(ListItemButton)<ListItemButtonProps>(({ theme }) => ({
  borderRadius: `8px`,
  mb: 0.5,
  alignItems: 'flex-start',
  '&:hover': {
    background: theme.palette.dark[100]
  }
}));

const NavItem = ({ item, level }: NavItemProps) => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

  const { openItem } = useAppSelector(viewsSelector.menu);

  const Icon = item?.icon!;
  const itemIcon = item?.icon ? (
    <Icon />
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
    dispatch(viewsMiddleware.activateMenuItem([id]));

    if (matchesSM) {
      dispatch(viewsMiddleware.openMenuDrawer(false));
    }
  };

  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split('/')
      .findIndex((id) => id === item.id);

    if (currentIndex > -1) {
      dispatch(viewsMiddleware.activateMenuItem([item.id!]));
    }
  }, [item.id]);

  return (
    <StyledListItemButton
      theme={theme}
      {...listItemProps}
      disabled={item.disabled}
      selected={openItem?.findIndex((id) => id === item.id) > -1}
      onClick={() => itemHandler(item.id!)}
    >
      <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36, color: theme.palette.common.black }}>
        {itemIcon}
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography
            sx={{
              color: theme.palette.common.black
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
                color: theme.palette.common.black
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
    </StyledListItemButton>
  );
};

export default NavItem;
