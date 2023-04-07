import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Recency } from '@axios/patientEmr/managerPatientEmrTypes';
import { Button, Grid } from '@mui/material';
import { patientsMiddleware } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { dispatch } from 'redux/hooks';
import { paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

const PrescriptionTabs = () => {
  const [t] = useTranslation();
  const router = useRouter();
  const patientId = router.query.id as string;

  useEffect(() => {
    if (patientId) {
      dispatch(patientsMiddleware.getPatientMedications(patientId, Recency.Current, 1));
      dispatch(patientsMiddleware.getPatientMedications(patientId, Recency.Past, 1));
    }
  }, [patientId]);

  const handleOnClick = () => {
    dispatch(viewsMiddleware.openModal({ name: ModalName.AddPatientPrescriptionModal, props: null }));
  };

  return (
    <Grid item container justifyContent="flex-end">
        <Button color="primary" variant="contained" sx={{ p: paddings.all12 }} onClick={handleOnClick}>
          {t(Translation.PAGE_PRESCRIPTIONS_ADD_BUTTON)}
        </Button>
      </Grid>
  );
};

export default PrescriptionTabs;
