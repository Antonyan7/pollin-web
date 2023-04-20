import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Actions from '@components/Modals/ExternalResults/PatientContactInformationModal/Actions';
import Body from '@components/Modals/ExternalResults/PatientContactInformationModal/Body';
import { DialogContent, Divider, Grid } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { bookingMiddleware } from '@redux/slices/booking';
import { patientsSelector } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { PatientInformationContext } from 'context/PatientInformationContext';
import { margins } from 'themes/themeConstants';
import { ModalName } from 'types/modals';
import { IPatientContactInformationModalProps } from 'types/reduxTypes/resultsStateTypes';

import BaseModal from '@ui-component/Modal/BaseModal';

const PatientContactInformationModal = (row: IPatientContactInformationModalProps) => {
  const isPatientContactInformationLoading = useSelector(patientsSelector.isPatientContactInformationLoading);
  const [t] = useTranslation();
  const patientContactInformationTitleLabel = t(Translation.MODAL_EXTERNAL_RESULTS_PATIENT_CONTACT_INFORMATION_TITLE);
  const shouldOpenSpecimenCollection = 'isEditable' in row;
  const onClose = () => {
    dispatch(viewsMiddleware.closeModal(ModalName.PatientContactInformation));

    if (!shouldOpenSpecimenCollection) {
      dispatch(bookingMiddleware.getAppointmentDetails());
    }
  };

  return (
    <BaseModal
      isLoading={isPatientContactInformationLoading}
      title={patientContactInformationTitleLabel}
      onClose={onClose}
      dataCy={CypressIds.PAGE_SPECIMEN_COLLECTION_MODAL_COLLECT}
    >
      <Grid>
        <DialogContent sx={{ p: 1.5 }}>
          <PatientInformationContext>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Body />
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ marginBottom: margins.bottom16 }} />
                <Actions row={row} shouldOpenSpecimenCollection={shouldOpenSpecimenCollection} />
              </Grid>
            </Grid>
          </PatientInformationContext>
        </DialogContent>
      </Grid>
    </BaseModal>
  );
};

export default PatientContactInformationModal;
