import { useCallback } from 'react';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { ModalName } from 'types/modals';

const useFormUnsavedChanges = (areFormFieldsChanged: boolean, handleFormClose: () => void, modalName: ModalName) =>
  useCallback(() => {
    if (areFormFieldsChanged) {
      dispatch(
        viewsMiddleware.openModal({
          name: modalName,
          props: {
            confirmChanges: () => {
              handleFormClose();
              dispatch(viewsMiddleware.closeModal(modalName));
            }
          }
        })
      );
    } else {
      handleFormClose();
    }
  }, [handleFormClose, areFormFieldsChanged, modalName]);

export default useFormUnsavedChanges;
