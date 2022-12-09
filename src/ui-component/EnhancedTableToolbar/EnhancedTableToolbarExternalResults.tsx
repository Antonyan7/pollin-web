import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TransportActionType } from '@axios/results/resultsManagerTypes';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Grid, MenuItem, Typography } from '@mui/material';
import { resultsMiddleware } from '@redux/slices/results';
import { Translation } from 'constants/translations';
import { dispatch } from 'redux/hooks';
import { viewsMiddleware } from 'redux/slices/views';
import { ModalName } from 'types/modals';
import { SpecimenActions, SpecimenActionsValues } from 'types/reduxTypes/resultsStateTypes';

import { BaseSelectWithLoading } from '@ui-component/BaseDropdownWithLoading';

interface EnhancedTableToolbarExternalResultsProps {
  numSelected: number;
  specimenActions: SpecimenActions[];
  selectedStatuses: string[];
  selected: string[];
}

const EnhancedTableToolbarExternalResults = ({
  numSelected,
  specimenActions,
  selectedStatuses,
  selected
}: EnhancedTableToolbarExternalResultsProps) => {
  const [t] = useTranslation();
  const checkSameStatues = useMemo(() => Array.from(new Set(selectedStatuses)), [selectedStatuses]);
  const hasSameStatues = useMemo(() => checkSameStatues.length > 1, [checkSameStatues]);
  const options = useMemo(
    () => specimenActions.find((item: SpecimenActions) => item.status === checkSameStatues[0]),
    [specimenActions, checkSameStatues]
  );
  const showOptions = options?.actions.find((item) => item.id !== TransportActionType.MarkInTransit);

  const handleMoveToTransportAction = () => {
    dispatch(resultsMiddleware.resetLastCreatedTransportFolderId());
    dispatch(
      viewsMiddleware.openModal({ name: ModalName.AddNewExistingTransportModal, props: { specimenIds: selected } })
    );
  };

  const onMenuItemClick = useCallback(
    (optionType: TransportActionType, actionIndex: number) => {
      if (
        optionType === TransportActionType.MoveToAnotherTransport ||
        optionType === TransportActionType.MoveToTransport
      ) {
        handleMoveToTransportAction();
      }
      // TODO @Sirusho: Please take a look on this case and make sure that everything should be like this
      else {
        const element = options?.actions.find((_, index) => index === actionIndex);

        dispatch(
          viewsMiddleware.openModal({
            name: ModalName.SelectMachineModal,
            props: { specimenIds: selected, actionType: element?.id }
          })
        );
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options?.actions, selected]
  );

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
            {options?.actions.map((item: SpecimenActionsValues, index: number) => (
              <MenuItem
                key={item.title}
                value={item.title}
                onClick={() => {
                  onMenuItemClick(item.id as TransportActionType, index);
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

export default EnhancedTableToolbarExternalResults;
