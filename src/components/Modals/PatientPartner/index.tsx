import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { dispatch } from '@redux/hooks';
import { patientsMiddleware } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { ModalName } from 'types/modals';

import StaticModal from '@ui-component/StaticModal';

export interface PatientPartnerModalProps {
  patientId: string;
}

const PatientPartnerModal: React.FC<PatientPartnerModalProps> = ({ patientId }) => {
  const [t] = useTranslation();
  const router = useRouter();
  const handleModalClose = useCallback(() => {
    dispatch(viewsMiddleware.closeModal(ModalName.PatientPartnerModal));
  }, []);

  const handleConfirm = useCallback(() => {
    const partnerProfileURL = router.pathname.replace('[id]', patientId);

    dispatch(patientsMiddleware.setCurrentPatient(patientId));
    router.push(partnerProfileURL);
    handleModalClose();
  }, [handleModalClose, patientId, router]);

  return (
    <StaticModal
      data={{
        headerTitle: t(Translation.MODAL_PATIENT_PARTNER_HEADER_TITLE),
        explanationMessage: t(Translation.MODAL_PATIENT_PARTNER_EXPLANATION_MESSAGE),
        actualQuestion: t(Translation.MODAL_PATIENT_PARTNER_ACTUAL_QUESTION) ?? '',
        cancelLabel: t(Translation.COMMON_BUTTON_CANCEL_LABEL) ?? '',
        confirmLabel: t(Translation.COMMON_BUTTON_CONFIRM_LABEL)
      }}
      onClose={handleModalClose}
      toConfirm={handleConfirm}
    />
  );
};

export default PatientPartnerModal;
