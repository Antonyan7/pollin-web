import React, { useCallback, useState } from 'react';
import { OrderResultActionType } from '@axios/results/resultsManagerTypes';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Grid, IconButton, Menu, MenuItem } from '@mui/material';
import { viewsMiddleware } from '@redux/slices/views';
import { dispatch } from 'redux/hooks';
import { ModalName } from 'types/modals';
import { IOrderResultsByPatientItem } from 'types/reduxTypes/resultsStateTypes';
import { OrderResultAction } from 'types/results';

interface ContextMenuProps {
  actions: OrderResultAction[];
  row: IOrderResultsByPatientItem;
}

const ContextMenu = ({ actions, row }: ContextMenuProps) => {
  const [anchorElement, setAnchorElement] = useState<Element | ((element: Element) => Element) | null>(null);
  const handleClick = (event: React.MouseEvent) => {
    setAnchorElement(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElement(null);
  };

  const onMenuItemClick = useCallback(
    (actionIndex: number) => {
      const element = actions.find((_, index) => index === actionIndex);

      if (element?.id === OrderResultActionType.Release) {
        dispatch(
          viewsMiddleware.openModal({
            name: ModalName.TestResultReleaseConfirmation,
            props: { testResultId: row.id }
          })
        );
      }

      if (element?.id === OrderResultActionType.Review) {
        dispatch(
          viewsMiddleware.openModal({
            name: ModalName.TestResultReviewConfirmation,
            props: { testResultId: row.id }
          })
        );
      }
    },
    [actions, row]
  );

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
        {actions?.map((el, index) => (
          <MenuItem
            onClick={() => {
              handleClose();
              onMenuItemClick(index);
            }}
          >
            {el.title}
          </MenuItem>
        ))}
      </Menu>
    </Grid>
  );
};

export default ContextMenu;
