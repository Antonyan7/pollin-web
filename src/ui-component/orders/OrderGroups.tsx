import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, CircularProgress, Grid, Stack } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { paddings } from 'themes/themeConstants';
import { IOrderGroup } from 'types/reduxTypes/resultsStateTypes';

import GroupItemsWrapper from '@ui-component/orders/GroupItemsWrapper';

const OrderGroups = () => {
  const selectedOrderType = useSelector(resultsSelector.selectedOrderType);
  const isOrderGroupsLoading = useSelector(resultsSelector.isOrderGroupsLoading);
  const orderGroups = useSelector(resultsSelector.orderGroups);

  useEffect(() => {
    if (selectedOrderType) {
      dispatch(resultsMiddleware.getOrderGroups(selectedOrderType));
    }
  }, [selectedOrderType]);

  return (
    <Box py={paddings.all24} px={paddings.all24} justifyContent="end">
      <Stack direction="row" alignItems="center" justifyContent="flex-start" px={paddings.all12} />
      {isOrderGroupsLoading ? (
        <Grid item display="flex" alignItems="center" justifyContent="center" sx={{ width: '100%', height: '100%' }}>
          <CircularProgress />
        </Grid>
      ) : (
        <div>
          {orderGroups.map((orderGroup: IOrderGroup) => (
            <GroupItemsWrapper orderGroup={orderGroup} key={orderGroup.id} />
          ))}
        </div>
      )}
    </Box>
  );
};

export default OrderGroups;
