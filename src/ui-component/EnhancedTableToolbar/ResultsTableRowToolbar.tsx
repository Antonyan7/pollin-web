import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ActionType, TransportActionType } from '@axios/results/resultsManagerTypes';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Grid, MenuItem, Typography } from '@mui/material';
import { resultsMiddleware } from '@redux/slices/results';
import { Translation } from 'constants/translations';
import { dispatch } from 'redux/hooks';
import { viewsMiddleware } from 'redux/slices/views';
import { ModalName } from 'types/modals';
import { SpecimenActions, SpecimenActionsValues, TableRowCheckboxProps } from 'types/reduxTypes/resultsStateTypes';

import { useToolbarAction } from '@hooks/useToolbarAction';
import { BaseSelectWithLoading } from '@ui-component/BaseDropdownWithLoading';

interface EnhancedTableToolbarExternalResultsProps {
  numSelected: number;
  specimenActions: SpecimenActions[];
  selectedRows: TableRowCheckboxProps[];
}

const ResultsTableRowToolbar = ({
  numSelected,
  specimenActions,
  selectedRows
}: EnhancedTableToolbarExternalResultsProps) => {
  const [t] = useTranslation();
  const selectedStatuses = selectedRows.map((row) => row.status);
  const selectedId = selectedRows.map((row) => row.id);
  const selectedIdentifiers = selectedRows.map((row) => row.identifier);
  const checkSameStatues = Array.from(new Set(selectedStatuses));
  const hasSameStatues = checkSameStatues.length > 1;
  const options = useMemo(
    () => specimenActions.find((item: SpecimenActions) => item.title === checkSameStatues[0]),
    [specimenActions, checkSameStatues]
  );
  const showOptions = options?.actions.find((item) => item.id !== TransportActionType.MarkInTransit);

  const handleMoveToTransportAction = useCallback(() => {
    dispatch(resultsMiddleware.resetLastCreatedTransportFolderId());
    dispatch(
      viewsMiddleware.openModal({
        name: ModalName.AddNewExistingTransportModal,
        props: { specimenIds: selectedId, selectedIdentifiers }
      })
    );
  }, [selectedId, selectedIdentifiers]);

  const handleMarkAsAction = useCallback(
    (actionType: string) => {
      dispatch(
        viewsMiddleware.openModal({
          name: ModalName.SelectMachineModal,
          props: { specimens: selectedRows, actionType }
        })
      );
    },
    [selectedRows]
  );

  const actionBindings = [
    {
      actionId: TransportActionType.MoveToTransport,
      actionCallback: () => {
        handleMoveToTransportAction();
      }
    },
    {
      actionId: TransportActionType.MoveToAnotherTransport,
      actionCallback: () => {
        handleMoveToTransportAction();
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
    <Grid container xs={12} sx={{ mt: '7px', mb: '7px' }}>
      {numSelected ? (
        <Grid item container alignItems="center" xs={9}>
          <Typography color="inherit" variant="h4">
            {numSelected} Selected
          </Typography>
        </Grid>
      ) : (
        <Grid item container alignItems="center" xs={9}>
          <Typography variant="h6" id="tableTitle">
            Nutrition
          </Typography>
        </Grid>
      )}
      {numSelected && !hasSameStatues && options?.actions && showOptions && (
        <Grid item xs={3}>
          <BaseSelectWithLoading
            IconComponent={KeyboardArrowDownIcon}
            id="action-label"
            labelId="action-label"
            label={t(Translation.PAGE_SCHEDULING_TEMPLATES_TABLE_HEADER_ACTION)}
          >
            {options?.actions.map((item: SpecimenActionsValues) => (
              <MenuItem
                key={item.title}
                value={item.title}
                onClick={() => {
                  toolbarAction(item.id);
                }}
              >
                {item.title}
              </MenuItem>
            ))}
          </BaseSelectWithLoading>
        </Grid>
      )}
    </Grid>
  );
};

export default ResultsTableRowToolbar;
