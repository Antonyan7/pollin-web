import React, { useCallback, useState } from 'react';
import { ActionType, TransportActionType } from '@axios/results/resultsManagerTypes';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Grid, IconButton, Menu, MenuItem } from '@mui/material';
import { resultsMiddleware } from '@redux/slices/results';
import { dispatch } from 'redux/hooks';
import { viewsMiddleware } from 'redux/slices/views';
import { ModalName } from 'types/modals';
import {
  IAllTestsSpecimensListItem,
  ISpecimensInTransportListItem,
  ISpecimensListItem,
  ITransportListFolderProps,
  SpecimenActionsValues
} from 'types/reduxTypes/resultsStateTypes';

import { useToolbarAction } from '@hooks/useToolbarAction';

interface ContextMenuProps {
  actions: SpecimenActionsValues[];
  row: ISpecimensListItem | IAllTestsSpecimensListItem | ITransportListFolderProps | ISpecimensInTransportListItem;
}

const ContextMenu = ({ actions, row }: ContextMenuProps) => {
  const [anchorElement, setAnchorElement] = useState<Element | ((element: Element) => Element) | null>(null);
  const handleClick = (event: React.MouseEvent) => {
    setAnchorElement(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElement(null);
  };

  const handleMoveToTransportAction = useCallback(() => {
    dispatch(resultsMiddleware.resetLastCreatedTransportFolderId());
    dispatch(
      viewsMiddleware.openModal({ name: ModalName.AddNewExistingTransportModal, props: { specimenIds: row.id } })
    );
  }, [row.id]);

  const handleHandoffConfirmationAction = useCallback(() => {
    dispatch(
      viewsMiddleware.openModal({
        name: ModalName.HandoffConfirmation,
        props: { row }
      })
    );
  }, [row]);

  const handleMarkAsAction = useCallback(
    (actionType: string) => {
      dispatch(
        viewsMiddleware.openModal({
          name: ModalName.SelectMachineModal,
          props: { specimenIds: [row.id], actionType }
        })
      );
    },
    [row.id]
  );

  const actionBindings = [
    {
      actionId: TransportActionType.MoveToTransport,
      actionCallback: () => {
        handleMoveToTransportAction();
      }
    },
    {
      actionId: TransportActionType.MarkInTransit,
      actionCallback: () => {
        handleHandoffConfirmationAction();
      }
    },
    {
      actionId: ActionType.InProgress,
      actionCallback: () => {
        handleMarkAsAction(ActionType.InProgress);
      }
    },
    {
      actionId: ActionType.Recollect,
      actionCallback: () => {
        handleMarkAsAction(ActionType.Recollect);
      }
    },
    {
      actionId: ActionType.Retest,
      actionCallback: () => {
        handleMarkAsAction(ActionType.Retest);
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
