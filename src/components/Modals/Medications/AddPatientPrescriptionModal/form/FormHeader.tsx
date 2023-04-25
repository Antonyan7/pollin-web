import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { Box, DialogTitle, Divider, IconButton } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { patientsMiddleware } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { margins } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

const FormHeader = ({ isDirty }: { isDirty: boolean }) => {
  const [t] = useTranslation();
  const onClose = useCallback(() => {
    if (isDirty) {
      dispatch(
        viewsMiddleware.openModal({
          name: ModalName.ConfirmCancellationModal,
          props: {
            action: () => {
              dispatch(viewsMiddleware.closeModal(ModalName.AddPatientPrescriptionModal));
              dispatch(patientsMiddleware.setPatientPrescriptionsItems());
            }
          }
        })
      );
    } else {
      dispatch(viewsMiddleware.closeModal(ModalName.AddPatientPrescriptionModal));
      dispatch(patientsMiddleware.setPatientPrescriptionsItems());
    }
  }, [isDirty]);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'spaceBetween', marginTop: margins.top8, marginLeft: margins.left8 }}>
        <DialogTitle sx={{ fontWeight: 500 }}>{t(Translation.PAGE_PRESCRIPTIONS_ADD_BUTTON)}</DialogTitle>
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
      <Divider />
    </>
  );
};

export default FormHeader;
