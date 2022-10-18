import React from 'react';
import { useTranslation } from 'react-i18next';
import { DialogActions, Grid, Stack } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { bookingSelector } from '@redux/slices/booking';
import { Translation } from 'constants/translations';
import { borderRadius, margins } from 'themes/themeConstants';

import { ButtonWithLoading } from '@ui-component/common/buttons';

interface FormActionsProps {
  isActionButtonDisabled: boolean;
}

const FormActions = ({ isActionButtonDisabled }: FormActionsProps) => {
  const [t] = useTranslation();
  const isConfirmationLoading = useAppSelector(bookingSelector.isAppoitmentLoading);

  const addButtonLabel = t(Translation.MODAL_APPOINTMENTS_ADD_BUTTON_ADD);

  return (
    <DialogActions sx={{ p: 4, paddingTop: margins.top8 }}>
      <Grid container justifyContent="flex-end" alignItems="center">
        <Grid item xs={12}>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
            <ButtonWithLoading
              sx={{
                borderRadius: borderRadius.radius8
              }}
              isLoading={isConfirmationLoading}
              variant="contained"
              type="submit"
              disabled={isActionButtonDisabled}
            >
              {addButtonLabel}
            </ButtonWithLoading>
          </Stack>
        </Grid>
      </Grid>
    </DialogActions>
  );
};

export default FormActions;
