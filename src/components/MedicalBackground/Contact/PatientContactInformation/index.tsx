import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PatientMedicalBackgroundSection from '@components/MedicalBackground/components/PatientMedicalBackgroundSection';
import PatientContactInformationEdit from '@components/MedicalBackground/Contact/PatientContactInformation/edit';
import PatientContactInformationView from '@components/MedicalBackground/Contact/PatientContactInformation/view';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';

const PatientContactInformation = () => {
  const router = useRouter();
  const [t] = useTranslation();
  const isContactInformationLoading = useAppSelector(patientsSelector.isContactInformationLoading);
  const isContactInformationButtonClicked = useAppSelector(patientsSelector.isContactInformationButtonClicked);

  useEffect(() => {
    if (typeof router.query.id === 'string') {
      dispatch(patientsMiddleware.getMedicalContactInformation(router.query.id));
    }
  }, [router.query.id, isContactInformationButtonClicked]);

  const onEditButtonClick = () => {
    dispatch(patientsMiddleware.changeContactInformationEditButtonState());
  };

  useEffect(
    () => {
      if (isContactInformationButtonClicked) {
        dispatch(patientsMiddleware.changeContactInformationEditButtonState());
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.query]
  );

  return (
    <PatientMedicalBackgroundSection
      isButtonClicked={isContactInformationButtonClicked}
      onClick={onEditButtonClick}
      title={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_PATIENT_CONTACT_INFORMATION)}
      isLoading={isContactInformationLoading}
    >
      {isContactInformationButtonClicked ? <PatientContactInformationEdit /> : <PatientContactInformationView />}
    </PatientMedicalBackgroundSection>
  );
};

export default PatientContactInformation;
