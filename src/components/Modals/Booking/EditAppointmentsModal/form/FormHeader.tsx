import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { Box, DialogTitle, Divider, IconButton } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { ModalName } from 'constants/modals';
import { Translation } from 'constants/translations';

const FormHeader = () => {
  const [t] = useTranslation();
  const editTitleLabel = t(Translation.MODAL_APPOINTMENTS_EDIT_TITLE);

  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.closeModal(ModalName.EditAppointmentModal));
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'spaceBetween', marginLeft: '15px' }}>
        <DialogTitle sx={{ fontWeight: 700 }} id="mui-6">
          {editTitleLabel}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 20,
            top: 20,
            color: (theme) => theme.palette.common.black
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
    </>
  );
};

export default FormHeader;
