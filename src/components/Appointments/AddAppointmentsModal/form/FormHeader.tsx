import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { Box, DialogTitle, Divider, IconButton } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { bookingMiddleware } from '@redux/slices/booking';
import { viewsMiddleware } from '@redux/slices/views';
import { ModalName } from 'constants/modals';
import { Translation } from 'constants/translations';

const FormHeader = () => {
  const [t] = useTranslation();

  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.setModalState({ name: ModalName.NONE, props: {} }));
    dispatch(bookingMiddleware.getPatients(null));
    dispatch(bookingMiddleware.getPatientAlerts(''));
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'spaceBetween' }}>
        <DialogTitle sx={{ fontWeight: 700 }} id="mui-6">
          {t(Translation.MODAL_APPOINTMENTS_ADD_TITLE)}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 20,
            top: 10,
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
