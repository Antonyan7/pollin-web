import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PatientMedicalBackgroundSection from '@components/MedicalBackground/components/PatientMedicalBackgroundSection';
import MaleGenitourinaryHistoryEdit from '@components/MedicalBackground/MedicalHistory/MaleGenitourinaryHistory/editView';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';

import MaleGenitourinaryHistoryView from './view';

const MaleGenitourinaryHistory = () => {
  const router = useRouter();
  const [t] = useTranslation();
  const isMaleGenitourinaryHistoryLoading = useAppSelector(patientsSelector.isMalePatientGenitourinaryHistoryLoading);
  const isMalePatientGenitourinaryEditButtonClicked = useAppSelector(
    patientsSelector.isMalePatientGenitourinaryEditButtonClicked
  );

  useEffect(() => {
    if (typeof router.query.id === 'string') {
      dispatch(patientsMiddleware.getMaleGenitourinaryHistory(router.query.id));
    }
  }, [router.query.id]);

  const onEditButtonClick = () => {
    dispatch(patientsMiddleware.setEditMalePatientGenitourinaryState(!isMalePatientGenitourinaryEditButtonClicked));
  };

  return (
    <PatientMedicalBackgroundSection
      isButtonClicked={isMalePatientGenitourinaryEditButtonClicked}
      onClick={onEditButtonClick}
      title={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_GENITOURINARY_HISTORY_TITLE)}
      isLoading={isMaleGenitourinaryHistoryLoading}
    >
      {isMalePatientGenitourinaryEditButtonClicked ? (
        <MaleGenitourinaryHistoryEdit />
      ) : (
        <MaleGenitourinaryHistoryView />
      )}
    </PatientMedicalBackgroundSection>
  );
};

export default MaleGenitourinaryHistory;
