import React, { useState } from 'react';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Grid, IconButton, Menu, MenuItem } from '@mui/material';
import { SpecimenActionsValues } from 'types/reduxTypes/resultsStateTypes';

interface ContextMenuProps {
  actions: SpecimenActionsValues[];
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
        <MoreVertOutlinedIcon
          fontSize="small"
          color="inherit"
          aria-controls="menu-friend-card"
          aria-haspopup="true"
          sx={{ opacity: 0.6 }}
        />
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
          <MenuItem onClick={handleClose}>{el.title}</MenuItem>
        ))}
      </Menu>
    </Grid>
  );
};

export default ContextMenu;
