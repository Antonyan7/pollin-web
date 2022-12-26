import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Stack } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { paddings } from 'themes/themeConstants';

const OrderDetailsActions = () => {
  const [t] = useTranslation();
  const router = useRouter();
  const { orderId } = router.query;

  const orderDetails = useAppSelector(resultsSelector.orderDetails);

  const onCancelClick = () => {
    // TODO: implement order cancelation
  };

  const onConfirmOrderClick = () => {
    if (orderDetails.groups !== null && typeof orderId === 'string') {
      dispatch(resultsMiddleware.updateOrder(orderId, orderDetails));
    }
  };

  return (
    <Stack direction="row" gap={2} py={paddings.all12} px={paddings.all24} justifyContent="end">
      <Button
        data-cy={CypressIds.PAGE_ORDER_DETAILS_BUTTON_CANCEL}
        color="primary"
        onClick={onCancelClick}
        variant="outlined"
        size="large"
      >
        {t(Translation.PAGE_ORDER_DETAILS_BUTTON_CANCEL)}
      </Button>
      <Button
        data-cy={CypressIds.PAGE_ORDER_DETAILS_BUTTON_CONFIRM}
        color="primary"
        onClick={onConfirmOrderClick}
        variant="contained"
        size="large"
      >
        {t(Translation.PAGE_ORDER_DETAILS_BUTTON_CONFIRM)}
      </Button>
    </Stack>
  );
};

export default OrderDetailsActions;
