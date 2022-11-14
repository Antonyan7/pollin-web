import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Actions from '@components/Modals/ExternalResults/PatientContactInformationModal/Actions';
import Body from '@components/Modals/ExternalResults/PatientContactInformationModal/Body';
import { DialogContent, Divider, Grid } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { PatientInformationContext } from 'context/PatientInformationContext';
import { margins } from 'themes/themeConstants';
import { ModalName } from 'types/modals';
import { IPatientContactInformationModalProps } from 'types/reduxTypes/resultsStateTypes';

import BaseModal from '@ui-component/Modal/BaseModal';

const PatientContactInformationModal = (row: IPatientContactInformationModalProps) => {
  const [modalLoading] = useState(false);
  const [t] = useTranslation();
  const patientContactInformationTitleLabel = t(Translation.MODAL_EXTERNAL_RESULTS_PATIENT_CONTACT_INFORMATION_TITLE);

  const onClose = () => dispatch(viewsMiddleware.closeModal(ModalName.PatientContactInformation));

  return (
    <BaseModal isLoading={modalLoading} title={patientContactInformationTitleLabel} onClose={onClose}>
      <Grid>
        <DialogContent sx={{ p: 1.5 }}>
          <PatientInformationContext>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Body />
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ marginBottom: margins.bottom16 }} />
                <Actions row={row} />
              </Grid>
            </Grid>
          </PatientInformationContext>
        </DialogContent>
      </Grid>
    </BaseModal>
  );
};

export default PatientContactInformationModal;
