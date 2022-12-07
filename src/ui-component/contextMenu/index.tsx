import React, { useCallback, useState } from 'react';
import { TransportActionType } from '@axios/results/resultsManagerTypes';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Grid, IconButton, Menu, MenuItem } from '@mui/material';
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

  const onMenuItemClick = useCallback(
    (actionIndex: number) => {
      const element = actions.find((_, index) => index === actionIndex);

      if (element?.id === TransportActionType.MarkInTransit) {
        dispatch(
          viewsMiddleware.openModal({
            name: ModalName.HandoffConfirmation,
            props: { row }
          })
        );

        return;
      }

      dispatch(
        viewsMiddleware.openModal({
          name: ModalName.SelectMachineModal,
          props: { specimenIds: [row.id], actionType: element?.id }
        })
      );
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
