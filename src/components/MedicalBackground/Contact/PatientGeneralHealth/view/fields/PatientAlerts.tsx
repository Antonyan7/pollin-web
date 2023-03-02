import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import FieldWrapper from '@components/MedicalBackground/components/common/FieldWrapper';
import { GeneralHealthComponentsProps } from '@components/MedicalBackground/helpers';
import { Grid, Typography } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';

const PatientAlerts = ({ componentIndex }: GeneralHealthComponentsProps) => {
  const [t] = useTranslation();
  const router = useRouter();
  const patientId = router.query.id;
  const patientAlerts = useAppSelector(patientsSelector.patientAlertDetails);
  const fieldName = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_PATIENT_ALERTS);

  useEffect(() => {
    if (typeof patientId === 'string') {
      dispatch(patientsMiddleware.getPatientAlertDetails(patientId));
    }
  }, [patientId]);

  return (
    <FieldWrapper fieldName={fieldName} componentIndex={componentIndex}>
      <Grid item container xs={7} justifyContent="center" direction="column">
        {patientAlerts?.length ? (
          patientAlerts?.map((alert) =>
            alert.messages.map((alertMessage) => <Grid key={alert.id}>{`${alertMessage.title}: ${alert.title}`}</Grid>)
          )
        ) : (
          <Typography>{t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_CONSULTATION_NO)}</Typography>
        )}
      </Grid>
    </FieldWrapper>
  );
};

export default PatientAlerts;
