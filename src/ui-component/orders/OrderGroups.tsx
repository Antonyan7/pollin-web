import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, CircularProgress, Grid, Stack } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { ordersMiddleware, ordersSelector } from '@redux/slices/orders';
import { paddings } from 'themes/themeConstants';
import { IOrderGroup, IOrderGroupsCollection } from 'types/reduxTypes/ordersStateTypes';

import GroupItemsWrapper from '@ui-component/orders/GroupItemsWrapper';

const OrderGroups = () => {
  const selectedOrderType = useSelector(ordersSelector.selectedOrderType);
  const isOrderGroupsLoading = useSelector(ordersSelector.isOrderGroupsLoading);
  const orderGroupsCollections = useSelector(ordersSelector.orderGroups);

  useEffect(() => {
    if (selectedOrderType) {
      dispatch(ordersMiddleware.getOrderGroups(selectedOrderType));
    }
  }, [selectedOrderType]);

  const renderOrderGroups = () => {
    const activeOrderGroups = orderGroupsCollections?.find(
      (orderGroup: IOrderGroupsCollection) => orderGroup.orderTypeId === selectedOrderType
    );

    return (
      <div>
        {activeOrderGroups?.groups.map((orderGroup: IOrderGroup) => (
          <GroupItemsWrapper orderGroup={orderGroup} key={orderGroup.id} />
        ))}
      </div>
    );
  };

  return (
    <Box py={paddings.all24} px={paddings.all24} justifyContent="end">
      <Stack direction="row" alignItems="center" justifyContent="flex-start" px={paddings.all12} />
      {isOrderGroupsLoading ? (
        <Grid item display="flex" alignItems="center" justifyContent="center" sx={{ width: '100%', height: '100%' }}>
          <CircularProgress />
        </Grid>
      ) : (
        renderOrderGroups()
      )}
    </Box>
  );
};

export default OrderGroups;
