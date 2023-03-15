import React from 'react';
import { useTranslation } from 'react-i18next';
import { DialogContent, Grid, Theme } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import BaseModal from '@ui-component/Modal/BaseModal';

import Actions from './Actions';
import Body from './Body';

const VerifyPatientPhotoModal = () => {
  const [t] = useTranslation();
  const modalTitle = t(Translation.MODAL_VERIFY_PATIENT_PHOTO_TITLE);

  const onClose = () => dispatch(viewsMiddleware.closeModal(ModalName.VerifyPatientPhotoModal));

  return (
    <BaseModal
      title={modalTitle}
      onClose={onClose}
      titleSx={{
        '& .MuiSvgIcon-root': {
          fill: (theme: Theme) => theme.palette.primary.main
        },
        marginTop: margins.top8
      }}
    >
      <Grid>
        <DialogContent sx={{ p: paddings.all8 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Body />
            </Grid>
            <Grid item xs={12}>
              <Actions />
            </Grid>
          </Grid>
        </DialogContent>
      </Grid>
    </BaseModal>
  );
};

export default VerifyPatientPhotoModal;
