import React, { useState } from 'react';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Grid, IconButton, Menu, MenuItem } from '@mui/material';

import { IContextActionBinding, useContextMenuAction } from '@hooks/useContextMenuAction';

interface ContextMenuProps {
  actionBindings: IContextActionBinding[];
  dataCy?: string;
}

export const ContextMenu = ({ actionBindings, dataCy }: ContextMenuProps) => {
  const [anchorElement, setAnchorElement] = useState<Element | ((element: Element) => Element) | null>(null);

  const handleClick = (event: React.MouseEvent) => {
    setAnchorElement(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElement(null);
  };

  const actionCallback = useContextMenuAction(actionBindings);

  return (
    <Grid item>
      <IconButton
        {...(dataCy && { 'data-cy': dataCy })}
        size="small"
        onClick={handleClick}
        disabled={!actionBindings.length}
      >
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
        {actionBindings?.map((actionItem) => (
          <MenuItem
            onClick={() => {
              handleClose();
              actionCallback(actionItem.id);
            }}
            {...(actionItem.dataCy && {
              'data-cy': actionItem?.dataCy
            })}
          >
            {actionItem.title}
          </MenuItem>
        ))}
      </Menu>
    </Grid>
  );
};
