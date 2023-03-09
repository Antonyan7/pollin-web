import React from 'react';
import { Avatar,Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { ModalName } from 'types/modals';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '50%'
};

export interface ImageModalProps {
  imgSrc: string;
  alt: string;
}

const ImageModal = ({ imgSrc, alt }: ImageModalProps) => {
  const onClose = () => dispatch(viewsMiddleware.closeModal(ModalName.ImageModal));

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open
      onClose={onClose}
    >
      <Box sx={style}>
        <Avatar
          alt={alt}
          src={imgSrc}
          sx={{
            borderRadius: '50%',
            width: { md: 440 },
            height: { md: 440 }
          }}
        />
      </Box>
    </Modal>
  );
};

export default ImageModal;
