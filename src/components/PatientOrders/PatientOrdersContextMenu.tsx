import React, { useCallback, useState } from 'react';
import { IOrdersPossibleActions } from '@axios/results/resultsManagerTypes';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Grid, IconButton, Menu, MenuItem } from '@mui/material';
import { dispatch } from 'redux/hooks';
import { viewsMiddleware } from 'redux/slices/views';
import { ModalName } from 'types/modals';
import { IOrdersListItem, OrdersActions } from 'types/reduxTypes/ordersStateTypes';

interface ContextMenuProps {
  actions: IOrdersPossibleActions[];
  row: IOrdersListItem;
}

const PatientOrdersContextMenu = ({ actions, row }: ContextMenuProps) => {
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

      if (element && element.id === OrdersActions.Cancel) {
        dispatch(
          viewsMiddleware.openModal({
            name: ModalName.OrderCancellation,
            props: { orderId: row.id }
          })
        );
      }
    },
    [actions, row]
  );

  return (
    <Grid item>
      <IconButton size="small" onClick={handleClick} disabled={!actions?.length}>
        <MoreVertOutlinedIcon aria-controls="menu-patient-order-card" aria-haspopup="true" />
      </IconButton>
      <Menu
        id="order-menu"
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
        {actions?.map((action, actionIndex) => (
          <MenuItem
            onClick={() => {
              handleClose();
              onMenuItemClick(actionIndex);
            }}
          >
            {action.title}
          </MenuItem>
        ))}
      </Menu>
    </Grid>
  );
};

export default PatientOrdersContextMenu;
