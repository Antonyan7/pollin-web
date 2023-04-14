import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { margins } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import { ButtonWithLoading } from '@ui-component/common/buttons';

interface BodyProps {
  action: () => void;
}

const Body = ({ action }: BodyProps) => {
  const [t] = useTranslation();

  const onClickConfirm = () => {
    action();
    dispatch(viewsMiddleware.closeModal(ModalName.ConfirmCancellationModal));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        <Typography>{t(Translation.MODAL_CONFIRM_ORDER_CREATE_CANCEL_SUBTITLE1)}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>{t(Translation.MODAL_CONFIRM_ORDER_CREATE_CANCEL_SUBTITLE2)}</Typography>
      </Grid>

      <Grid container justifyContent="flex-end" alignItems="center" mt={margins.top4}>
        <ButtonWithLoading isLoading={false} color="primary" variant="contained" onClick={onClickConfirm}>
          {t(Translation.COMMON_BUTTON_CONFIRM_LABEL)}
        </ButtonWithLoading>
      </Grid>
    </Grid>
  );
};

export default Body;
