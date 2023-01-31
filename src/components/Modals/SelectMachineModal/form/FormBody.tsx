import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActionType } from '@axios/results/resultsManagerTypes';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { DialogActions, DialogContent, Grid, Stack, Typography, useTheme } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { borderRadius, borders, margins, paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';
import { LabMachineProps } from 'types/reduxTypes/resultsStateTypes';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';
import { ButtonWithLoading } from '@ui-component/common/buttons';

interface FormBodyProps {
  specimenIds: string[];
  actionType: string;
}

const FormBody = ({ specimenIds, actionType }: FormBodyProps) => {
  const [t] = useTranslation();
  const theme = useTheme();
  const [modalTexts, setModalTexts] = useState({
    selectReasonText: '',
    selectLabel: ''
  });

  const setModalNames = useCallback(() => {
    switch (actionType) {
      case ActionType.InProgress:
        setModalTexts({
          selectReasonText: t(Translation.MODAL_CONFIRM_MACHINE_LOCATED_IN),
          selectLabel: t(Translation.MODAL_CONFIRM_MACHINE_VALUE)
        });
        break;
      case ActionType.Retest:
        setModalTexts({
          selectReasonText: t(Translation.MODAL_CONFIRM_REASON_FOR_RETEST_REQUIRED),
          selectLabel: t(Translation.MODAL_CONFIRM_MACHINE_VALUE_RETEST)
        });
        break;
      case ActionType.Recollect:
        setModalTexts({
          selectReasonText: t(Translation.MODAL_CONFIRM_REASON_FOR_RECOLLECT_REQUIRED),
          selectLabel: t(Translation.MODAL_CONFIRM_MACHINE_VALUE_RECOLLECT)
        });
        break;
      default:
        break;
    }
  }, [actionType, t]);

  useEffect(() => {
    dispatch(resultsMiddleware.getLabMachines(actionType));
    setModalNames();
  }, [actionType, setModalNames]);

  const labMachines = useAppSelector(resultsSelector.labMachines);
  const isLabMachinesLoading = useAppSelector(resultsSelector.isLabMachinesLoading);
  const options = labMachines.machines ? labMachines.machines : (labMachines.reasons as LabMachineProps[]);

  const isConfirmationLoading = useAppSelector(resultsSelector.isLabMachinesLoading);

  const addButtonLabel = t(Translation.MODAL_CONFIRM_MACHINE_BUTTON_CONFIRM);
  const [machineVal, setMachineVal] = useState('');

  const specimens = useMemo(() => specimenIds.map((id) => ({ id })), [specimenIds]);

  const onConfirmClick = useCallback(() => {
    switch (actionType) {
      case ActionType.InProgress:
        dispatch(resultsMiddleware.addMachineForSpecimen(specimens, machineVal));
        break;
      case ActionType.Retest:
        dispatch(resultsMiddleware.applyRetestAction(specimenIds, machineVal));
        break;
      case ActionType.Recollect:
        dispatch(resultsMiddleware.applyRecollectAction(specimenIds, machineVal));
        break;
      default:
        break;
    }

    dispatch(viewsMiddleware.closeModal(ModalName.SelectMachineModal));
  }, [specimenIds, machineVal, actionType, specimens]);

  return (
    <DialogContent sx={{ padding: `${paddings.top32} ${paddings.right32} ${paddings.bottom24} ${paddings.left32}` }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {specimenIds?.map((id) => (
            <Typography variant="h4">
              {t(Translation.MODAL_CONFIRM_MACHINE_SPECIMEN_ID)}:
              <Typography variant="h6" display="inline" marginLeft={margins.left4}>
                {id}
              </Typography>
            </Typography>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">{modalTexts.selectReasonText}</Typography>
        </Grid>
        <Grid item xs={12}>
          <BaseDropdownWithLoading
            isLoading={isLabMachinesLoading}
            ListboxProps={{
              style: {
                maxHeight: 260,
                borderRadius: `${borderRadius.radius8}`,
                border: `${borders.solid2px} ${theme.palette.primary.main}`
              }
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(_, value) => {
              if (value && typeof value === 'object' && 'id' in value) {
                setMachineVal(value.id);
              }
            }}
            options={options}
            getOptionLabel={(option) => (typeof option === 'object' ? option.title : option)}
            clearIcon={<CloseIcon onClick={() => setMachineVal('')} fontSize="small" />}
            popupIcon={<KeyboardArrowDownIcon sx={{ color: theme.palette.primary.main }} />}
            renderInputProps={{
              label: modalTexts.selectLabel
            }}
          />
        </Grid>
      </Grid>
      <DialogActions sx={{ p: paddings.all4, marginTop: margins.top4 }}>
        <Grid container justifyContent="flex-end" alignItems="center">
          <Grid item xs={12}>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
              <ButtonWithLoading
                sx={{
                  '&.MuiButton-root.MuiLoadingButton-root.Mui-disabled': {
                    backgroundColor: theme.palette.grey[200]
                  }
                }}
                isLoading={isConfirmationLoading}
                variant="contained"
                disabled={!machineVal}
                onClick={onConfirmClick}
              >
                {addButtonLabel}
              </ButtonWithLoading>
            </Stack>
          </Grid>
        </Grid>
      </DialogActions>
    </DialogContent>
  );
};

export default FormBody;
