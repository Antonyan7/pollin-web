import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledTextareaAutosize } from '@components/common/MaterialComponents';
import { Grid, Stack, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { dispatch, useAppSelector } from '@redux/hooks';
import { ordersMiddleware, ordersSelector } from '@redux/slices/orders';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';

import { DateUtil } from '@utils/date/DateUtil';

const OrderDetailsInformation = ({ isEdit }: { isEdit: boolean }) => {
  const [t] = useTranslation();
  const theme = useTheme();
  const { comment, isEditable, cancellation } = useAppSelector(ordersSelector.orderDetails);

  const updateDetailsComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(ordersMiddleware.updateDetailsComment(e.target.value));
  };

  return (
    <Box>
      <Stack px={paddings.all24} py={paddings.all24} borderBottom={`1px solid ${theme.palette.primary.light}`} gap={2}>
        <Typography variant="h3" color={theme.palette.common.black}>
          {t(Translation.PAGE_ORDER_DETAILS_COMMENTS)}
        </Typography>
        {isEditable || !isEdit ? (
          <StyledTextareaAutosize
            placeholder={t(Translation.PAGE_ORDER_DETAILS_COMMENTS_PLACEHOLDER) ?? undefined}
            color={theme.palette.primary.dark}
            defaultValue={comment}
            onChange={updateDetailsComment}
          />
        ) : (
          comment ?? ''
        )}
      </Stack>

      {cancellation?.reason ? (
        <Stack px={paddings.all24} py={paddings.all24} gap={2}>
          <Typography variant="h3" color={theme.palette.common.black}>
            {t(Translation.PAGE_ORDER_DETAILS_CANCELLATION_TITLE)}
          </Typography>

          <Grid container>
            <Grid item xs={6}>
              <Typography color={theme.palette.common.black}>
                {t(Translation.PAGE_ORDER_DETAILS_CANCELLATION_REASON)}
              </Typography>
              <Typography mt={3} color={theme.palette.common.black}>
                {t(Translation.PAGE_ORDER_DETAILS_CANCELLATION_DATE)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Stack color={theme.palette.common.black}>{cancellation.reason}</Stack>
              <Stack mt={3} color={theme.palette.common.black}>
                {!!cancellation.date && cancellation.date !== '-'
                  ? DateUtil.formatFullDate(cancellation.date)
                  : cancellation.date ?? ''}
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      ) : null}
    </Box>
  );
};

export default OrderDetailsInformation;
