import { ModalName } from 'types/modals';

import useFormUnsavedChanges from '@hooks/useFormUnsavedChanges';

const useCloseMedicalBackgroundFormWithChangesModal = (areFormFieldsChanged: boolean, handleFormClose: () => void) =>
  useFormUnsavedChanges(areFormFieldsChanged, handleFormClose, ModalName.MedicalBackgroundUnsavedChanges);

export default useCloseMedicalBackgroundFormWithChangesModal;
