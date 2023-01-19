import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Link, Stack, useTheme } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { ordersMiddleware, ordersSelector } from '@redux/slices/orders';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';

interface OrderDetailsDataActionsProps {
  orderId: string;
}

const OrderDetailsDataActions = ({ orderId }: OrderDetailsDataActionsProps) => {
  const [t] = useTranslation();
  const theme = useTheme();
  const requisitionsRef = useRef<HTMLAnchorElement | null>(null);
  const orderDetails = useAppSelector(ordersSelector.orderDetails);

  const onDownloadClick = useCallback(
    async (id: string) => {
      const blob = await dispatch(ordersMiddleware.downloadRequisition(id));

      if (blob && requisitionsRef.current) {
        const url = window.URL.createObjectURL(blob);

        requisitionsRef.current.href = url;
        requisitionsRef.current.download = `${orderDetails.id}.pdf`;
        requisitionsRef.current.click();
        window.URL.revokeObjectURL(url);
      }
    },
    [orderDetails.id]
  );

  return orderDetails.hasRequisition ? (
    <Stack
      direction="row"
      gap={2}
      py={paddings.all12}
      px={paddings.all24}
      borderBottom={`1px solid ${theme.palette.primary.light}`}
    >
      <Button
        data-cy={t(CypressIds.PAGE_ORDER_DETAILS_BUTTON_DOWNLOAD_REQUISITIONS)}
        color="primary"
        onClick={() => onDownloadClick(orderId)}
        variant="contained"
        size="large"
        sx={{ textTransform: 'none' }}
      >
        {t(Translation.PAGE_ORDER_DETAILS_BUTTON_DOWNLOAD_REQUISITIONS)}
        <Link component="a" ref={requisitionsRef} hidden href="#download" />
      </Button>
    </Stack>
  ) : null;
};

export default OrderDetailsDataActions;
