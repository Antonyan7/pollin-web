import React from 'react';
import { useTranslation } from 'react-i18next';
import GroupItemsList from '@components/Orders/OrderDetails/GroupItemsList';
import { Button, Grid, Stack, Typography, useTheme } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { ordersSelector } from '@redux/slices/orders';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';

const OrderDetailsBody = () => {
  const [t] = useTranslation();
  const theme = useTheme();
  const { groups, isEditable } = useAppSelector(ordersSelector.orderDetails);

  const onEditClick = () => {
    // TODO: Edit
  };

  return (
    <Stack px={paddings.all24} py={paddings.all24} borderBottom={`1px solid ${theme.palette.primary.light}`} gap={2}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h3" color={theme.palette.common.black}>
          {t(Translation.PAGE_ORDER_DETAILS_ORDER_SETS)}
        </Typography>
        {isEditable && (
          <Button color="primary" variant="contained" size="medium" onClick={onEditClick}>
            {t(Translation.PAGE_ORDER_DETAILS_BUTTON_EDIT)}
          </Button>
        )}
      </Stack>
      {groups?.map(({ id, title, groupItems }) => (
        <Grid container key={id}>
          <Grid item xs={6}>
            <Typography variant="h4" color={theme.palette.common.black}>
              {title}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Stack width="60%">
              <GroupItemsList groupItems={groupItems} />
            </Stack>
          </Grid>
        </Grid>
      ))}
    </Stack>
  );
};

export default OrderDetailsBody;
