import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogContent, Grid } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { ordersMiddleware, ordersSelector } from '@redux/slices/orders';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import BaseModal from '@ui-component/Modal/BaseModal';

import Body from './Body';

export interface OrderCancellationProps {
  orderId: string;
}

const OrderCancellationModal = ({ orderId }: OrderCancellationProps) => {
  const cancellationReasonsLoading = useAppSelector(ordersSelector.isCancellationReasonsLoading);

  useEffect(() => {
    dispatch(ordersMiddleware.getCancellationReasons());
  }, []);

  const [t] = useTranslation();
  const modalTitle = t(Translation.MODAL_CONFIRM_ORDER_CANCELLATION_TITLE);

  const onClose = () => dispatch(viewsMiddleware.closeModal(ModalName.OrderCancellation));

  return (
    <BaseModal isLoading={cancellationReasonsLoading} title={modalTitle} onClose={onClose}>
      <Grid>
        <DialogContent sx={{ p: paddings.all8 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Body orderId={orderId} />
            </Grid>
          </Grid>
        </DialogContent>
      </Grid>
    </BaseModal>
  );
};

export default OrderCancellationModal;
