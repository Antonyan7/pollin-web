import React, { useEffect } from 'react';
import PatientMedicalBackgroundSection from '@components/MedicalBackground/components/PatientMedicalBackgroundSection';
import PatientGeneralHealthEdit from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit';
import PatientGeneralHealthView from '@components/MedicalBackground/Contact/PatientGeneralHealth/view';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { useRouter } from 'next/router';

const PatientGeneralHealth = () => {
  const router = useRouter();
  const isGeneralHealthLoading = useAppSelector(patientsSelector.isGeneralHealthLoading);
  const isGeneralHealthEditButtonClicked = useAppSelector(patientsSelector.isGeneralHealthEditButtonClicked);

  useEffect(() => {
    if (typeof router.query.id === 'string') {
      dispatch(patientsMiddleware.getGeneralHealth(router.query.id));
    }
  }, [router.query.id]);

  const onEditButtonClick = () => {
    dispatch(patientsMiddleware.changeEditButtonClickState());
  };

  return (
    <PatientMedicalBackgroundSection
      isButtonClicked={isGeneralHealthEditButtonClicked}
      onClick={onEditButtonClick}
      title="General Health"
      isLoading={isGeneralHealthLoading}
    >
      {isGeneralHealthEditButtonClicked ? <PatientGeneralHealthEdit /> : <PatientGeneralHealthView />}
    </PatientMedicalBackgroundSection>
  );
};

export default PatientGeneralHealth;
