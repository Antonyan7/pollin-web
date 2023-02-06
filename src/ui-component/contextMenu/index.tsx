import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActionType, TransportActionType } from '@axios/results/resultsManagerTypes';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Grid, IconButton, Menu, MenuItem } from '@mui/material';
import { resultsMiddleware } from '@redux/slices/results';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
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
  const [t] = useTranslation();
  const router = useRouter();
  const [anchorElement, setAnchorElement] = useState<Element | ((element: Element) => Element) | null>(null);
  const handleClick = (event: React.MouseEvent) => {
    setAnchorElement(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElement(null);
  };

  const navigateToTestResultsPage = () => {
    const currentPath = router.pathname;
    const specimenId = row.id;
    const inHouseTestResultsPagePath = `${currentPath}/input-results/${specimenId}`;

    router.push(inHouseTestResultsPagePath);
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
          props: { specimens: [row], actionType }
        })
      );
    },
    [row]
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
        <MenuItem onClick={navigateToTestResultsPage}>
          {t(Translation.PAGE_IN_HOUSE_ACTIONS_INPUT_TEST_RESULTS)}
        </MenuItem>
      </Menu>
    </Grid>
  );
};

export default ContextMenu;
