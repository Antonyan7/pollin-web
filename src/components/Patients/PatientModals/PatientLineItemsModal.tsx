import React, { useCallback } from 'react';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { ModalName } from 'constants/modals';

import ObjectViewModal from '@ui-component/Modal/ObjectViewModal';

export interface PatientLineItemsModalProps {
  title: string;
  data: Record<string, string[]>;
}

const PatientLineItemsModal = ({ title, data }: PatientLineItemsModalProps) => {
  const onClose = useCallback(() => dispatch(viewsMiddleware.closeModal(ModalName.PatientLineItemsModal)), []);

  return <ObjectViewModal title={title} data={data} onClose={onClose} />;
};

export default PatientLineItemsModal;
