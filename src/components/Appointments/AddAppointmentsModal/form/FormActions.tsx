import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledButton } from '@components/Appointments/CommonMaterialComponents';
import { DialogActions, Grid, Stack } from '@mui/material';
import { ModalName } from 'constants/modals';
import { Translation } from 'constants/translations';
import { dispatch } from 'redux/hooks';
import { viewsMiddleware } from 'redux/slices/views';

const FormActions: React.FC = () => {
  const [t] = useTranslation();
  const closeModal = () => dispatch(viewsMiddleware.setModalState({ name: ModalName.NONE, props: {} }));

  const cancelButtonLabel = t(Translation.MODAL_APPOINTMENTS_ADD_BUTTON_CANCEL);
  const addButtonLabel = t(Translation.MODAL_APPOINTMENTS_ADD_BUTTON_ADD);

  return (
    <DialogActions sx={{ p: 3 }}>
      <Grid container justifyContent="flex-end" alignItems="center">
        <Grid item xs={12}>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
            <StyledButton type="button" variant="contained" onClick={closeModal}>
              {cancelButtonLabel}
            </StyledButton>
            <StyledButton variant="contained" type="submit">
              {addButtonLabel}
            </StyledButton>
          </Stack>
        </Grid>
      </Grid>
    </DialogActions>
  );
};

export default FormActions;
