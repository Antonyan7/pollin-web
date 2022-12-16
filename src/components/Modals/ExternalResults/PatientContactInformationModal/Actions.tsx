import React from 'react';
import { useTranslation } from 'react-i18next';
import { DialogActions, Grid, Stack } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { bookingMiddleware } from '@redux/slices/booking';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { usePatientInfoContext } from 'context/PatientInformationContext';
import { useRouter } from 'next/router';
import { borderRadius, margins } from 'themes/themeConstants';
import { ModalName } from 'types/modals';
import { IPatientContactInformationModalProps } from 'types/reduxTypes/resultsStateTypes';

import { ButtonWithLoading } from '@ui-component/common/buttons';

interface IPatientInfoProps {
  row: IPatientContactInformationModalProps;
}

const Actions = ({ row }: IPatientInfoProps) => {
  const [t] = useTranslation();
  const router = useRouter();
  const confirmButtonLabel = t(Translation.MODAL_EXTERNAL_RESULTS_PATIENT_CONTACT_INFORMATION_CONFIRMATION_BUTTON);
  const { patientInfo } = usePatientInfoContext();

  const redirectToTestResultsDetailsPage = () => {
    if (row.shouldBeRedirected) {
      const currentPath = router.asPath;
      const testResultId = row.id;
      const inputTestPageURL = `${currentPath}/input-results/${testResultId}`;

      router.push(inputTestPageURL);
    }

    dispatch(viewsMiddleware.closeModal(ModalName.PatientContactInformation));

    // Check is specimenTrackings patientResults Modal
    if ('isEditable' in row) {
      dispatch(
        viewsMiddleware.openModal({
          name: ModalName.SpecimenTrackingCollection,
          props: {
            appointmentId: row.id
          }
        })
      );
    }

    dispatch(bookingMiddleware.getAppointmentDetails());
  };

  return (
    <DialogActions sx={{ marginTop: margins.top4 }}>
      <Grid container justifyContent="flex-end" alignItems="center">
        <Grid item xs={12}>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
            <ButtonWithLoading
              sx={{
                borderRadius: borderRadius.radius8,
                '&.MuiButton-root.MuiLoadingButton-root': {
                  backgroundColor: (theme) => theme.palette.primary.main
                },
                '&.MuiButton-root.MuiLoadingButton-root.Mui-disabled': {
                  backgroundColor: (theme) => theme.palette.primary.light
                }
              }}
              isLoading={false}
              variant="contained"
              disabled={!patientInfo.isPatientInfoConfirmed}
              onClick={redirectToTestResultsDetailsPage}
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
