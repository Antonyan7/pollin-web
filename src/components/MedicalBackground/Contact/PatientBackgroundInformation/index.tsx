import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PatientMedicalBackgroundSection from '@components/MedicalBackground/components/PatientMedicalBackgroundSection';
import PatientBackgroundInformationEdit from '@components/MedicalBackground/Contact/PatientBackgroundInformation/edit';
import PatientBackgroundInformationView from '@components/MedicalBackground/Contact/PatientBackgroundInformation/view';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';

const PatientBackgroundInformation = () => {
  const router = useRouter();
  const [t] = useTranslation();
  const isPatientBackgroundInformationLoading = useAppSelector(patientsSelector.isPatientBackgroundInformationLoading);
  const isPatientBackgroundEditButtonClicked = useAppSelector(patientsSelector.isPatientBackgroundEditButtonClicked);

  useEffect(() => {
    if (typeof router.query.id === 'string') {
      dispatch(patientsMiddleware.getPatientBackgroundInformation(router.query.id));
    }
  }, [router.query.id]);

  const onEditButtonClick = () => {
    dispatch(patientsMiddleware.changePatientBackgroundEditButtonState());
  };

  return (
    <PatientMedicalBackgroundSection
      isButtonClicked={isPatientBackgroundEditButtonClicked}
      onClick={onEditButtonClick}
      title={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_PATIENT_CONTACT_BACKGROUND_INFORMATION)}
      isLoading={isPatientBackgroundInformationLoading}
    >
      {isPatientBackgroundEditButtonClicked ? (
        <PatientBackgroundInformationEdit />
      ) : (
        <PatientBackgroundInformationView />
      )}
    </PatientMedicalBackgroundSection>
  );
};

export default PatientBackgroundInformation;
