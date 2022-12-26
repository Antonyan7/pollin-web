import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledTextareaAutosize } from '@components/Appointments/CommonMaterialComponents';
import { Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAppSelector } from '@redux/hooks';
import { resultsSelector } from '@redux/slices/results';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';

const OrderDetailsComments = () => {
  const [t] = useTranslation();
  const theme = useTheme();
  const { comment } = useAppSelector(resultsSelector.orderDetails);

  return (
    <Stack px={paddings.all24} py={paddings.all12} borderBottom={`1px solid ${theme.palette.primary.light}`} gap={2}>
      <Typography variant="h3" color={theme.palette.common.black}>
        {t(Translation.PAGE_ORDER_DETAILS_COMMENTS)}
      </Typography>
      <StyledTextareaAutosize
        placeholder={t(Translation.PAGE_ORDER_DETAILS_COMMENTS_PLACEHOLDER) ?? undefined}
        color={theme.palette.primary.dark}
        value={comment}
      />
    </Stack>
  );
};

export default OrderDetailsComments;
