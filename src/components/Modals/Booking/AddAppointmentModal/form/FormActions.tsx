import React from 'react';
import { useTranslation } from 'react-i18next';
import { DialogActions, Grid, Stack } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { bookingSelector } from '@redux/slices/booking';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { margins } from 'themes/themeConstants';

import { ButtonWithLoading } from '@ui-component/common/buttons';

interface FormActionsProps {
  isActionButtonDisabled: boolean;
}

const FormActions = ({ isActionButtonDisabled }: FormActionsProps) => {
  const [t] = useTranslation();
  const isConfirmationLoading = useAppSelector(bookingSelector.isAppointmentLoading);

  const addButtonLabel = t(Translation.MODAL_APPOINTMENTS_ADD_BUTTON_ADD);
  const addButtonLabelCyId = CypressIds.MODAL_APPOINTMENTS_ADD_BUTTON_ADD;

  return (
    <DialogActions sx={{ p: 4, marginTop: margins.top4 }}>
      <Grid container justifyContent="flex-end" alignItems="center">
        <Grid item xs={12}>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
            <ButtonWithLoading
              sx={{
                '&.MuiButton-root.MuiLoadingButton-root.Mui-disabled': {
                  backgroundColor: (theme) => theme.palette.grey[200]
                }
              }}
              data-cy={addButtonLabelCyId}
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
