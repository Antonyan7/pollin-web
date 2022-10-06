import React, { useEffect } from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {
  Avatar,
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ListItemLink from 'components/Link/ListItemLink';
import { dispatch, useAppSelector } from 'redux/hooks';
import { viewsMiddleware, viewsSelector } from 'redux/slices/views';
import { LinkTarget, NavItemType } from 'types';

interface NavItemProps {
  item: NavItemType;
  level: number;
}

const StyledListItemButton = styled(ListItemButton, { shouldForwardProp: (prop) => prop !== 'level' })<{
  level: number;
}>(({ level }) => ({
  borderRadius: '8px',
  mb: 0.5,
  alignItems: 'flex-start',
  backgroundColor: level > 1 ? 'transparent' : 'inherit',
  py: level > 1 ? 1 : 1.25,
  pl: `${level * 24}px`
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

  const itemHandler = (id: string) => {
    dispatch(viewsMiddleware.activateMenuItem([id]));

    if (matchesSM) {
      dispatch(viewsMiddleware.openMenuDrawer(false));
    }
  };

  useEffect(() => {
    const currentPaths = document.location.pathname.toString().split('/');
    const currentIndex = currentPaths.findIndex((id) => id.replace('-', '').toLowerCase() === item.id?.toLowerCase());

    if (currentIndex > -1) {
      dispatch(viewsMiddleware.activateMenuItem([item.id!]));
    } else if (currentPaths.includes('patient-emr')) {
      dispatch(viewsMiddleware.activateMenuItem(['Patient List/EMR']));
    }
  }, [item.id]);

  return (
    <ListItemLink item={item} itemTarget={itemTarget}>
      <StyledListItemButton
        theme={theme}
        level={level}
        disabled={item.disabled}
        selected={openItem?.findIndex((id) => id === item.id) > -1}
        onClick={() => itemHandler(item.id!)}
      >
        <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36, color: theme.palette.common.black }}>
          {itemIcon}
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography variant={openItem?.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'} color="inherit">
              {item.title}
            </Typography>
          }
          secondary={
            item.caption && (
              <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
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
    </ListItemLink>
  );
};

export default NavItem;
