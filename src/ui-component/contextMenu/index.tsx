import React, { useState } from 'react';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { CircularProgress, Grid, IconButton, Menu, MenuItem } from '@mui/material';
import { CypressIds } from 'constants/cypressIds';
import { paddings } from 'themes/themeConstants';

import { IContextActionBinding, useContextMenuAction } from '@hooks/useContextMenuAction';

interface ContextMenuProps {
  actionBindings: IContextActionBinding[];
  dataCy?: string;
  isLoading?: boolean;
}

export const ContextMenu = ({ actionBindings, isLoading, dataCy }: ContextMenuProps) => {
  const [anchorElement, setAnchorElement] = useState<Element | ((element: Element) => Element) | null>(null);
  const cypressId = dataCy ?? CypressIds.COMMON_CONTEXT_MENU;
  const handleClick = (event: React.MouseEvent) => {
    setAnchorElement(event.currentTarget);
  };
  const handleClose = () => {
    if (!isLoading) {
      setAnchorElement(null);
    }
  };

  const actionCallback = useContextMenuAction(actionBindings);

  return (
    <Grid item>
      <IconButton data-cy={cypressId} size="small" onClick={handleClick} disabled={!actionBindings.length}>
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
        {isLoading ? (
          <Grid xs={1} p={paddings.all12}>
            <CircularProgress size={20} />
          </Grid>
        ) : (
          actionBindings?.map((actionItem) => (
            <MenuItem
              onClick={() => {
                handleClose();
                actionCallback(actionItem.id);
              }}
              {...(actionItem.dataCy && {
                'data-cy': actionItem?.dataCy
              })}
              key={actionItem.id}
            >
              {actionItem.title}
            </MenuItem>
          ))
        )}
      </Menu>
    </Grid>
  );
};
