import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, DialogActions, Grid, Stack } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { ModalName } from 'types/modals';

const Actions = () => {
  const [t] = useTranslation();
  const confirmButtonLabel = t(Translation.MODAL_ERROR_GO_BACK);
  const router = useRouter();

  const onClickConfirm = () => {
    router.back();
    router.reload();
    dispatch(viewsMiddleware.closeModal(ModalName.ErrorModal));
  };

  return (
    <DialogActions>
      <Grid container justifyContent="flex-end" alignItems="center">
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="center">
            <Button sx={{ width: '100%' }} color="primary" variant="contained" onClick={onClickConfirm}>
              {confirmButtonLabel}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </DialogActions>
  );
};

export default Actions;
