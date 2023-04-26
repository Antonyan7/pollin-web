import React, { MouseEvent, useState } from 'react';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import { Grid, Menu, MenuItem, Typography } from '@mui/material';
import { margins, paddings } from 'themes/themeConstants';

export enum MenuItemType {
  List = 'List',
  Item = 'Item'
}

export interface IMenuItem {
  id: string;
  title: string;
  items: IMenuItem[];
}

export interface SimpleMenuProps {
  ActionButton: ({ handleClick }: { handleClick: (event: MouseEvent<HTMLElement>) => void }) => JSX.Element;
  onItemClick: (item: IMenuItem) => void;
  items: IMenuItem[];
}

const SimpleMenuItem = ({ item, onItemClick }: { item: IMenuItem; onItemClick?: (item: IMenuItem) => void }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const isMenuItemEnabled = item.items.length > 0;
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <MenuItem onClick={handleClick} disabled={!isMenuItemEnabled}>
        <Grid container display="flex" direction="row" alignItems="center">
          <Grid item xs={11}>
            <Typography>{item.title}</Typography>
          </Grid>
          <Grid item xs={1} display="flex">
            <ArrowForwardIos
              sx={{
                fontSize: (theme) => theme.typography.pxToRem(14),
                color: (theme) => theme.palette.primary.main
              }}
            />
          </Grid>
        </Grid>
      </MenuItem>
      <Menu
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'top'
        }}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top'
        }}
        sx={(theme) => ({
          '& .MuiPaper-root': {
            borderRadius: 4,
            border: `1px solid ${theme.palette.primary.main}`
          },
          '& ul': {
            px: paddings.leftRight16
          },
          '& .MuiMenuItem-root': {
            borderRadius: 2
          },
          '& .MuiMenuItem-root:hover': {
            background: theme.palette.primary[100]
          }
        })}
        onClose={handleClose}
        slotProps={{
          backdrop: {
            onClick: handleClose
          }
        }}
      >
        {item?.items?.map((navigationItem) => (
          <MenuItem key={navigationItem.id} sx={{ p: paddings.all8 }} onClick={() => onItemClick?.(navigationItem)}>
            <Typography variant="body2">{navigationItem.title}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const SimpleMenu = ({ ActionButton, items, onItemClick }: SimpleMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ActionButton handleClick={handleClick} />
      <Menu
        anchorEl={anchorEl}
        open={open}
        slotProps={{
          backdrop: {
            onClick: handleClose
          }
        }}
        sx={(theme) => ({
          '& .MuiPaper-root': {
            borderRadius: 4,
            border: `1px solid ${theme.palette.primary.main}`,
            mt: margins.top20
          },
          '& ul': {
            px: paddings.leftRight16
          },
          '& .MuiMenuItem-root': {
            borderRadius: 2
          },
          '& .MuiMenuItem-root:hover': {
            background: theme.palette.primary[100]
          }
        })}
      >
        {items.map((item) => (
          <SimpleMenuItem
            key={item.id}
            item={item}
            {...(item.items.length > 0 && {
              onItemClick
            })}
          />
        ))}
      </Menu>
    </>
  );
};

export default SimpleMenu;
