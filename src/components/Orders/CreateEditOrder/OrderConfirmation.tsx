import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import resultsHelpers from '@axios/results/resultsHelpers';
import GroupItemsList from '@components/Orders/OrderDetails/GroupItemsList';
import { Button, Grid, Stack, Typography, useTheme } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { ordersMiddleware, ordersSelector } from '@redux/slices/orders';
import { Translation } from 'constants/translations';
import { updateOrderCreationStep } from 'context/actions/OrderCreationContextActions';
import { useOrderCreationContext } from 'context/OrderCreationContext';
import { paddings } from 'themes/themeConstants';

const OrderConfirmation = ({ isEdit }: { isEdit: boolean }) => {
  const [t] = useTranslation();
  const theme = useTheme();
  const orderTypeOptions = useAppSelector(ordersSelector.orderTypeOptions);
  const orderDetails = useAppSelector(ordersSelector.orderDetails);
  const editableOrderDetails = useSelector(ordersSelector.editableOrderDetails);
  const { dispatchOrderCreationState } = useOrderCreationContext();
  const onEditClick = (typeId: string) => () => {
    dispatch(ordersMiddleware.updateSelectedOrderType(typeId));
    dispatchOrderCreationState(updateOrderCreationStep(0));
  };
  const pickedOrderTypes = useMemo(
    () => resultsHelpers.getValidatedOrderDetails(editableOrderDetails) ?? [],
    [editableOrderDetails]
  );

  return (
    <Stack
      paddingTop={paddings.all24}
      paddingBottom={paddings.all24}
      gap={2}
      borderBottom={`1px solid ${theme.palette.primary.light}`}
    >
      {pickedOrderTypes.map(({ id: orderTypeId, groups }) => (
        <React.Fragment key={orderTypeId}>
          <Stack p={paddings.all24} direction="row" justifyContent="space-between">
            <Typography variant="h3" color={theme.palette.common.black}>
              {orderTypeOptions.find(({ id }) => id === orderTypeId)?.title}
            </Typography>
            {(!isEdit || orderDetails.isEditable) && (
              <Button color="primary" variant="contained" size="medium" onClick={onEditClick(orderTypeId)}>
                {t(Translation.PAGE_ORDER_DETAILS_BUTTON_EDIT)}
              </Button>
            )}
          </Stack>
          {groups?.map(({ id, title, groupItems }) => (
            <Grid p={paddings.all24} container key={id}>
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
