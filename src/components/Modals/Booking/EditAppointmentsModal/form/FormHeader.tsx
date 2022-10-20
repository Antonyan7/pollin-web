import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { Box, DialogTitle, Divider, IconButton } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { margins } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

const FormHeader = () => {
  const [t] = useTranslation();
  const editTitleLabel = t(Translation.MODAL_APPOINTMENTS_EDIT_TITLE);

  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.closeModal(ModalName.EditAppointmentModal));
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'spaceBetween', marginLeft: '8px' }}>
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
            color: (theme) => theme.palette.primary.main
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ margin: `${margins.topBottom0} ${margins.leftRight24}` }} />
    </>
  );
};

export default FormHeader;
