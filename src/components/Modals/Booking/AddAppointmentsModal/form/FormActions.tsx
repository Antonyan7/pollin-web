import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledAddButton } from '@components/Appointments/CommonMaterialComponents';
import { DialogActions, Grid, Stack } from '@mui/material';
import { Translation } from 'constants/translations';

interface FormActionsProps {
  isActionButtonDisabled: boolean;
}

const FormActions = ({ isActionButtonDisabled }: FormActionsProps) => {
  const [t] = useTranslation();

  const addButtonLabel = t(Translation.MODAL_APPOINTMENTS_ADD_BUTTON_ADD);

  return (
    <DialogActions sx={{ p: 4, paddingTop: '10px' }}>
      <Grid container justifyContent="flex-end" alignItems="center">
        <Grid item xs={12}>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
            <StyledAddButton color="secondary" variant="contained" type="submit" disabled={isActionButtonDisabled}>
              {addButtonLabel}
            </StyledAddButton>
          </Stack>
        </Grid>
      </Grid>
    </DialogActions>
  );
};

export default FormActions;
