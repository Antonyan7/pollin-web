import React, { useState } from 'react';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Grid, IconButton, Menu, MenuItem } from '@mui/material';
import { OrderResultAction } from 'types/results';

interface ContextMenuProps {
  actions: OrderResultAction[];
}

const ContextMenu = ({ actions }: ContextMenuProps) => {
  const [anchorElement, setAnchorElement] = useState<Element | ((element: Element) => Element) | null>(null);
  const handleClick = (event: React.MouseEvent) => {
    setAnchorElement(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElement(null);
  };

  return (
    <Grid item>
      <IconButton size="small" onClick={handleClick} disabled={!actions.length}>
        <MoreVertOutlinedIcon aria-controls="menu-friend-card" aria-haspopup="true" />
      </IconButton>
      <Menu
        id="menu-simple-card"
        anchorEl={anchorElement}
        keepMounted
        open={Boolean(anchorElement)}
        onClose={handleClose}
        variant="selectedMenu"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        {actions?.map((el) => (
          <MenuItem
            onClick={() => {
              handleClose();
            }}
          >
            {el.id}
          </MenuItem>
        ))}
      </Menu>
    </Grid>
  );
};

export default ContextMenu;
