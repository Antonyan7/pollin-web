import React from 'react';
import { useTranslation } from 'react-i18next';
import { DialogActions, Grid, Stack } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { patientsMiddleware } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { margins, paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import { ButtonWithLoading } from '@ui-component/common/buttons';

interface ActionsProps {
  prescriptionId: string;
}

const Actions = ({ prescriptionId }: ActionsProps) => {
  const [t] = useTranslation();
  const confirmButtonLabel = t(Translation.MODAL_PRESCRIPTIONS_ARCHIVE);
  const router = useRouter();

  const onClickConfirm = () => {
    dispatch(patientsMiddleware.archivePatientPrescription(prescriptionId));
    dispatch(patientsMiddleware.getPatientPrescriptions(router.query.id as string, 1));
    dispatch(viewsMiddleware.closeModal(ModalName.PrescriptionsArchive));
  };

  return (
    <DialogActions sx={{ marginTop: margins.top4 }}>
      <Grid container justifyContent="flex-end" alignItems="center">
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="flex-end">
            <ButtonWithLoading
              isLoading={false}
              sx={{
                py: paddings.top12,
                px: paddings.leftRight24
              }}
              color="primary"
              variant="contained"
              onClick={onClickConfirm}
            >
              {confirmButtonLabel}
            </ButtonWithLoading>
          </Stack>
        </Grid>
      </Grid>
    </DialogActions>
  );
};

export default Actions;
