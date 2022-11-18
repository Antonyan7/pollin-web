import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { DialogActions, DialogContent, Grid, Stack, Typography, useTheme } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { createOptionsGroup } from 'helpers/berryFunctions';
import { borderRadius, borders, margins, paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';
import { ButtonWithLoading } from '@ui-component/common/buttons';

interface FormBodyProps {
  specimenIds: string[];
}

const FormBody = ({ specimenIds }: FormBodyProps) => {
  const [t] = useTranslation();

  useEffect(() => {
    dispatch(resultsMiddleware.getLabMachines());
  }, []);

  const labMachines = useAppSelector(resultsSelector.labMachines);
  const islabMachinesLoading = useAppSelector(resultsSelector.islabMachinesLoading);
  const labMachinesOptions = createOptionsGroup(labMachines);
  const theme = useTheme();
  const machineSelectLabel = t(Translation.MODAL_CONFIRM_MACHINE_VALUE);

  const isConfirmationLoading = useAppSelector(resultsSelector.islabMachinesLoading);

  const addButtonLabel = t(Translation.MODAL_CONFIRM_MACHINE_BUTTON_CONFIRM);
  const [machineVal, setMachineVal] = useState('');

  const onClick = useCallback(() => {
    dispatch(resultsMiddleware.addMachineforSpecimen(specimenIds, machineVal));
    dispatch(viewsMiddleware.closeModal(ModalName.SelectMachineModal));
  }, [specimenIds, machineVal]);

  return (
    <DialogContent sx={{ padding: `${paddings.top32} ${paddings.right32} ${paddings.bottom24} ${paddings.left32}` }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {specimenIds?.map((id) => (
            <Typography variant="h4">
              {t(Translation.MODAL_CONFIRM_MACHINE_SPECIMEN_ID)}:
              <Typography variant="caption" fontWeight="bold" marginLeft={margins.left4}>
                {id}
              </Typography>
            </Typography>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="caption">{t(Translation.MODAL_CONFIRM_MACHINE_LOCATED_IN)}</Typography>
        </Grid>
        <Grid item xs={12}>
          <BaseDropdownWithLoading
            isLoading={islabMachinesLoading}
            ListboxProps={{
              style: {
                maxHeight: 260,
                borderRadius: `${borderRadius.radius8}`,
                border: `${borders.solid2px} ${theme.palette.primary.main}`
              }
            }}
            isOptionEqualToValue={(option, value) => option.item.id === value.item.id}
            onChange={(_, value) => setMachineVal(value?.item.id)}
            options={labMachinesOptions}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.item.title}
            popupIcon={<KeyboardArrowDownIcon sx={{ color: theme.palette.primary.main }} />}
            renderInputProps={{
              label: machineSelectLabel
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
                  borderRadius: borderRadius.radius8,
                  '&.MuiButton-root.MuiLoadingButton-root.Mui-disabled': {
                    backgroundColor: theme.palette.grey[200]
                  }
                }}
                isLoading={isConfirmationLoading}
                variant="contained"
                disabled={!machineVal}
                onClick={onClick}
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
