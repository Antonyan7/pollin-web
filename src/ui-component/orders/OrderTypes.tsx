import React from 'react';
import { useSelector } from 'react-redux';
import { Box, CircularProgress, Grid, Stack, useTheme } from '@mui/material';
import { ordersSelector } from '@redux/slices/orders';
import { paddings } from 'themes/themeConstants';
import { IOrderGroup, IOrderTypesCollection } from 'types/reduxTypes/ordersStateTypes';

import GroupItemsWrapper from '@ui-component/orders/GroupItemsWrapper';

const OrderTypes = () => {
  const selectedOrderType = useSelector(ordersSelector.selectedOrderType);
  const isOrderTypesLoading = useSelector(ordersSelector.isOrderTypesLoading);
  const editableOrderDetails = useSelector(ordersSelector.editableOrderDetails);
  const theme = useTheme();

  const renderOrderTypes = () => {
    const activeOrderTypes = editableOrderDetails?.find(
      (orderGroup: IOrderTypesCollection) => orderGroup.id === selectedOrderType
    );

    return (
      <Box>
        {activeOrderTypes?.groups?.map((orderGroup: IOrderGroup, index) => (
          <GroupItemsWrapper index={index} orderGroup={orderGroup} key={orderGroup.id} />
        ))}
      </Box>
    );
  };

  return selectedOrderType ? (
    <Box p={paddings.all24} justifyContent="end" borderBottom={`1px solid ${theme.palette.primary.light}`}>
      <Stack direction="row" alignItems="center" justifyContent="flex-start" px={paddings.leftRight12} />
      {isOrderTypesLoading ? (
        <Grid item display="flex" alignItems="center" justifyContent="center" sx={{ width: '100%', height: '100%' }}>
          <CircularProgress />
        </Grid>
      ) : (
        renderOrderTypes()
      )}
    </Box>
  ) : null;
};

export default OrderTypes;
