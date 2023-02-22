import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledTextareaAutosize } from '@components/common/MaterialComponents';
import { Stack, Typography, useTheme } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { ordersMiddleware, ordersSelector } from '@redux/slices/orders';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';

const OrderDetailsComments = () => {
  const [t] = useTranslation();
  const theme = useTheme();
  const { comment } = useAppSelector(ordersSelector.orderDetails);

  const updateDetailsComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(ordersMiddleware.updateDetailsComment(e.target.value));
  };

  return (
    <Stack px={paddings.all24} py={paddings.all12} borderBottom={`1px solid ${theme.palette.primary.light}`} gap={2}>
      <Typography variant="h3" color={theme.palette.common.black}>
        {t(Translation.PAGE_ORDER_DETAILS_COMMENTS)}
      </Typography>
      <StyledTextareaAutosize
        placeholder={t(Translation.PAGE_ORDER_DETAILS_COMMENTS_PLACEHOLDER) ?? undefined}
        color={theme.palette.primary.dark}
        defaultValue={comment}
        onBlur={updateDetailsComment}
      />
    </Stack>
  );
};

export default OrderDetailsComments;
