import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { PlanPage } from '@components/Plans/types';
import { DialogContent, Grid, Stack, Typography } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import { ButtonWithLoading } from '@ui-component/common/buttons';
import BaseModal from '@ui-component/Modal/BaseModal';

export interface PlanCreationCancellationModalProps {
  swapPage: (type: PlanPage) => void;
}

const PlanCreationCancellation = ({ swapPage }: PlanCreationCancellationModalProps) => {
  const [t] = useTranslation();
  const modalTitle = t(Translation.MODAL_CONFIRM_ORDER_CREATE_CANCEL_TITLE);

  const onClose = useCallback(() => dispatch(viewsMiddleware.closeModal(ModalName.PlanCreationCancelModal)), []);

  const onClickConfirm = () => {
    onClose();
    swapPage(PlanPage.List);
  };

  return (
    <BaseModal isLoading={false} title={modalTitle} onClose={onClose}>
      <Grid>
        <DialogContent sx={{ p: paddings.all8 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={8}>
                  <Typography>{t(Translation.MODAL_CONFIRM_ORDER_CREATE_CANCEL_SUBTITLE1)}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{t(Translation.MODAL_CONFIRM_ORDER_CREATE_CANCEL_SUBTITLE2)}</Typography>
                </Grid>

                <Grid container justifyContent="flex-end" alignItems="center" mt={margins.top4}>
                  <Grid item xs={12}>
                    <Stack direction="row" alignItems="center" justifyContent="flex-end">
                      <ButtonWithLoading
                        isLoading={false}
                        sx={{
                          py: paddings.top12,
                          px: paddings.leftRight24
                        }}
                        color="primary"
                        variant="contained"
                        onClick={onClickConfirm}
                      >
                        {t(Translation.COMMON_BUTTON_CONFIRM_LABEL)}
                      </ButtonWithLoading>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Grid>
    </BaseModal>
  );
};

export default PlanCreationCancellation;
