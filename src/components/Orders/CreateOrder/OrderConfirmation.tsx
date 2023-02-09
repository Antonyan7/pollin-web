import React from 'react';
import { useTranslation } from 'react-i18next';
import GroupItemsList from '@components/Orders/OrderDetails/GroupItemsList';
import { Button, Grid, Stack, Typography, useTheme } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { ordersMiddleware, ordersSelector } from '@redux/slices/orders';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { updateOrderCreationStep } from 'context/actions/OrderCreationContextActions';
import { useOrderCreationContext } from 'context/OrderCreationContext';
import { paddings } from 'themes/themeConstants';

const OrderConfirmation = () => {
  const [t] = useTranslation();
  const theme = useTheme();
  const orderTypeOptions = useAppSelector(ordersSelector.orderTypeOptions);
  const { orderCreationState } = useOrderCreationContext();
  const { validatedOrderTypes } = orderCreationState;
  const { dispatchOrderCreationState } = useOrderCreationContext();
  const onEditClick = (typeId: string) => () => {
    dispatch(ordersMiddleware.updateSelectedOrderType(typeId));
    dispatchOrderCreationState(updateOrderCreationStep(0));
  };

  return (
    <Stack p={paddings.all24} borderBottom={`1px solid ${theme.palette.primary.light}`} gap={2}>
      {validatedOrderTypes.map(({ id: orderTypeId, groups }) => (
        <React.Fragment key={orderTypeId}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h3" color={theme.palette.common.black}>
              {orderTypeOptions.find(({ id }) => id === orderTypeId)?.title}
            </Typography>
            <Button
              color="primary"
              variant="contained"
              size="medium"
              onClick={onEditClick(orderTypeId)}
              data-cy={CypressIds.PAGE_CREATE_ORDER_BUTTON_EDIT}
            >
              {t(Translation.PAGE_CREATE_ORDER_BUTTON_EDIT)}
            </Button>
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
        </React.Fragment>
      ))}
    </Stack>
  );
};

export default OrderConfirmation;
