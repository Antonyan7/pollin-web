import React from 'react';
import { useTranslation } from 'react-i18next';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { ModalName } from 'types/modals';

import StaticModal from '@ui-component/StaticModal';

export interface MedicalBackgroundUnsavedChangesProps {
  confirmChanges: () => void;
}

const MedicalBackgroundUnsavedChanges = ({ confirmChanges }: MedicalBackgroundUnsavedChangesProps) => {
  const [t] = useTranslation();
  const closeModal = () => dispatch(viewsMiddleware.closeModal(ModalName.MedicalBackgroundUnsavedChanges));

  return (
    <StaticModal
      data={{
        headerTitle: t(Translation.MODAL_MEDICAL_BACKGROUND_UNDONE_CHANGES_ARE_YOU_SURE_WANT_TO_LEAVE_HEADER),
        actualQuestion:
          t(Translation.MODAL_MEDICAL_BACKGROUND_UNDONE_CHANGES_PLEASE_NOTE_THAT_THIS_ACTION_IS_PERMANENT) ?? '',
        explanationMessage:
          t(Translation.MODAL_MEDICAL_BACKGROUND_UNDONE_CHANGES_ANY_CHANGES_MESSAGE_WILL_BE_LOST) ?? '',
        confirmLabel: t(Translation.COMMON_BUTTON_CONFIRM_LABEL)
      }}
      toConfirm={() => {
        confirmChanges();
        closeModal();
      }}
      onClose={() => closeModal()}
    />
  );
};

export default MedicalBackgroundUnsavedChanges;
