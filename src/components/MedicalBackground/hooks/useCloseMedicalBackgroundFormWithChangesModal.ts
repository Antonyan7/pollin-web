import { useCallback } from 'react';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { ModalName } from 'types/modals';

const useCloseMedicalBackgroundFormWithChangesModal = (isFormFieldsChanged: boolean, handleFormClose: () => void) =>
  useCallback(() => {
    if (isFormFieldsChanged) {
      dispatch(
        viewsMiddleware.openModal({
          name: ModalName.MedicalBackgroundUnsavedChanges,
          props: {
            confirmChanges: () => {
              handleFormClose();
              dispatch(viewsMiddleware.closeModal(ModalName.MedicalBackgroundUnsavedChanges));
            }
          }
        })
      );
    } else {
      handleFormClose();
    }
  }, [handleFormClose, isFormFieldsChanged]);

export default useCloseMedicalBackgroundFormWithChangesModal;
