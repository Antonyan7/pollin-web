import React, { useCallback, useState } from 'react';
import { OrderResultActionType } from '@axios/results/resultsManagerTypes';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Grid, IconButton, Menu, MenuItem } from '@mui/material';
import { viewsMiddleware } from '@redux/slices/views';
import { dispatch } from 'redux/hooks';
import { ModalName } from 'types/modals';
import { IOrderResultsByPatientItem } from 'types/reduxTypes/ordersStateTypes';
import { OrderResultAction } from 'types/results';

import { useToolbarAction } from '@hooks/useToolbarAction';

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

  const handleTestResultReleaseConfirmationAction = useCallback(() => {
    dispatch(
      viewsMiddleware.openModal({
        name: ModalName.TestResultReleaseConfirmation,
        props: { testResultId: row.id }
      })
    );
  }, [row.id]);

  const handleTestResultReviewConfirmationAction = useCallback(() => {
    dispatch(
      viewsMiddleware.openModal({
        name: ModalName.TestResultReviewConfirmation,
        props: { testResultId: row.id }
      })
    );
  }, [row.id]);

  const actionBindings = [
    {
      actionId: OrderResultActionType.Release,
      actionCallback: () => {
        handleTestResultReleaseConfirmationAction();
      }
    },
    {
      actionId: OrderResultActionType.Review,
      actionCallback: () => {
        handleTestResultReviewConfirmationAction();
      }
    }
  ];

  const toolbarAction = useToolbarAction(actionBindings);

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
            key={el.id}
            onClick={() => {
              handleClose();
              toolbarAction(el.id);
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
