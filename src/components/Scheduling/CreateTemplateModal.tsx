import React from 'react';
import { Modal } from '@mui/material';
import { ModalName } from 'constants/modals';
import { viewsMiddleware } from 'redux/slices/views';

import ErrorModal from '@ui-component/schedule-template/ErrorModal';

import { dispatch } from '../../redux/hooks';

const CreateTemplateModal = () => {
  const onClose = () => dispatch(viewsMiddleware.setModalState({ name: ModalName.NONE, props: {} }));

  return (
    <Modal open onClose={onClose}>
      <ErrorModal handleClose={onClose} />
    </Modal>
  );
};

export default CreateTemplateModal;
