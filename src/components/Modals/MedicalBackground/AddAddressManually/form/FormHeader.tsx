import React from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { DialogTitle, Divider, Grid, IconButton } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

const FormHeader = () => {
  const [t] = useTranslation();
  const onClose = () => dispatch(viewsMiddleware.closeModal(ModalName.AddAddressManually));

  return (
    <>
      <Grid item container direction="row" justifyContent="space-between" p={`${paddings.all8}`}>
        <DialogTitle sx={{ fontWeight: 700 }}>
          {t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_ADD_ADDRESS_MANUALLY_MODAL_TITLE)}
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
      </Grid>
      <Divider sx={{ margin: `${margins.topBottom0} ${margins.leftRight24}` }} />
    </>
  );
};

export default FormHeader;
