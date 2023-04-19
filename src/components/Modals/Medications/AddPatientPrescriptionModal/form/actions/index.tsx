import React, { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { PrescriptionMedicationsProps } from '@axios/patientEmr/managerPatientEmrTypes';
import { Button, Grid, Stack, useTheme } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { borderRadius, paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import { ButtonWithLoading } from '@ui-component/common/buttons';

const ConfirmButton = () => {
  const [t] = useTranslation();
  const theme = useTheme();
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const {
    watch,
    formState: { dirtyFields }
  } = useFormContext();
  const isPrescriptionCreationLoading = useAppSelector(patientsSelector.isPrescriptionCreationLoading);

  const isFormChanged = Object.values(dirtyFields).length > 0;

  useEffect(() => {
    const subscription = watch((value) => {
      const { prescriberId, medications } = value;
      const isMedicaionFieldsFilled = medications.every((fields: PrescriptionMedicationsProps) => {
        const { time, refillNotes, doctorNotes, ...requiredMedicationFields } = fields;

        return Object.values(requiredMedicationFields).every((field) => Boolean(field));
      });
      const isRequiredFieldsFilled = !!prescriberId && isMedicaionFieldsFilled;

      if (isRequiredFieldsFilled) {
        setIsButtonDisabled(false);
      } else {
        setIsButtonDisabled(true);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const onClose = useCallback(() => {
    if (isFormChanged) {
      dispatch(
        viewsMiddleware.openModal({
          name: ModalName.ConfirmCancellationModal,
          props: { action: () => dispatch(viewsMiddleware.closeModal(ModalName.AddPatientPrescriptionModal)) }
        })
      );
    } else {
      dispatch(viewsMiddleware.closeModal(ModalName.AddPatientPrescriptionModal));
    }
  }, [isFormChanged]);

  return (
    <Grid item xs={12}>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
        <Button
          sx={{
            fontWeight: 500,
            borderRadius: borderRadius.radius10,
            px: paddings.leftRight24,
            py: paddings.topBottom12
          }}
          onClick={onClose}
          variant="outlined"
        >
          {t(Translation.COMMON_BUTTON_CANCEL_LABEL)}
        </Button>
        <ButtonWithLoading
          disabled={isButtonDisabled}
          sx={{
            '&.MuiButton-root.MuiLoadingButton-root.Mui-disabled': {
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.common.white
            }
          }}
          type="submit"
          isLoading={isPrescriptionCreationLoading}
          variant="contained"
        >
          {t(Translation.COMMON_BUTTON_SAVE_LABEL)}
        </ButtonWithLoading>
      </Stack>
    </Grid>
  );
};

export default ConfirmButton;
