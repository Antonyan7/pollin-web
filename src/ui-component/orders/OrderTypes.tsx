import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, CircularProgress, Grid, Stack } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { ordersMiddleware, ordersSelector } from '@redux/slices/orders';
import { paddings } from 'themes/themeConstants';
import { IOrderGroup, IOrderTypesCollection } from 'types/reduxTypes/ordersStateTypes';

import GroupItemsWrapper from '@ui-component/orders/GroupItemsWrapper';

const OrderTypes = () => {
  const selectedOrderType = useSelector(ordersSelector.selectedOrderType);
  const isOrderTypesLoading = useSelector(ordersSelector.isOrderTypesLoading);
  const orderTypes = useSelector(ordersSelector.orderTypes);

  useEffect(() => {
    dispatch(ordersMiddleware.getOrderTypes());
  }, []);

  const renderOrderTypes = () => {
    const activeOrderTypes = orderTypes?.find(
      (orderGroup: IOrderTypesCollection) => orderGroup.id === selectedOrderType
    );

    return (
      <div>
        {activeOrderTypes?.groups?.map((orderGroup: IOrderGroup) => (
          <GroupItemsWrapper orderGroup={orderGroup} key={orderGroup.id} />
        ))}
      </div>
    );
  };

  return (
    <Box p={paddings.all24} justifyContent="end">
      <Stack direction="row" alignItems="center" justifyContent="flex-start" px={paddings.leftRight12} />
      {isOrderTypesLoading ? (
        <Grid item display="flex" alignItems="center" justifyContent="center" sx={{ width: '100%', height: '100%' }}>
          <CircularProgress />
        </Grid>
      ) : (
        renderOrderTypes()
      )}
    </Box>
  );
};

export default OrderTypes;
