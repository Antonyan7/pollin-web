import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import InitialConsultationForm from '@components/ICForm';
import { Box } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';

const ICForm = () => {
  const [t] = useTranslation();
  const router = useRouter();
  const currentPatientId = router.query.id;
  const patientProfile = useAppSelector(patientsSelector.patientProfile);

  useEffect(() => {
    if (typeof currentPatientId === 'string') {
      dispatch(patientsMiddleware.getPatientProfile(currentPatientId));
      dispatch(patientsMiddleware.getPatientIcForm(currentPatientId));
      dispatch(patientsMiddleware.getPatientMedicalBackgroundDropdownOptions());
    }
  }, [currentPatientId]);

  return (
    <Box>
      <MainBreadcrumb
        currentPage={t(Translation.PAGE_PATIENT_PROFILE_INITIAL_CONSULTATION_FORM)}
        navigation={{
          basePath: '/',
          items: [
            {
              name: t(Translation.PAGE_PATIENT_LIST_TITLE),
              path: '/patient-emr/list'
            },
            {
              name: patientProfile?.fullName,
              path: `/patient-emr/details/${currentPatientId}/profile`
            },
            {
              name: t(Translation.PAGE_PATIENT_PROFILE_INITIAL_CONSULTATION_FORM),
              path: `/patient-emr/details/${currentPatientId}/ic-form`
            }
          ]
        }}
      />
      <InitialConsultationForm />
    </Box>
  );
};

export default ICForm;
