import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Box, FormControlLabel, FormGroup, Stack, useTheme } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { ordersMiddleware, ordersSelector } from '@redux/slices/orders';
import { paddings } from 'themes/themeConstants';
import { IOrderGroup, IOrderGroupItem, IOrderTypesCollection } from 'types/reduxTypes/ordersStateTypes';

import { WhiteCheckedIcon } from '@assets/icons/WhiteCheckedIcon';
import OrderGroupItem from '@ui-component/orders/OrderGroupItem';

import { isAllGroupItemSelected, isAnyGroupItemSelected } from './helpers';
import OrderGroupCheckbox from './OrderGroupCheckbox';

interface GroupItemsWrapperProps {
  orderGroup: IOrderGroup;
}

const GroupItemsWrapper = ({ orderGroup }: GroupItemsWrapperProps) => {
  const theme = useTheme();
  const orderTypes = useSelector(ordersSelector.orderTypes);
  const selectedOrderType = useSelector(ordersSelector.selectedOrderType);

  const activeOrderTypes = useMemo(
    () => orderTypes?.find((collection: IOrderTypesCollection) => collection.orderTypeId === selectedOrderType)?.groups,
    [orderTypes, selectedOrderType]
  );

  const isEverythingSelected = useMemo(() => isAllGroupItemSelected(orderGroup.groupItems), [orderGroup.groupItems]);

  const atLeastOneSelectedItemExists = useMemo(
    () => isAnyGroupItemSelected(orderGroup.groupItems),
    [orderGroup.groupItems]
  );

  const handleAllSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    const updateGroupItems = (groupItems: IOrderGroupItem[]): IOrderGroupItem[] =>
      groupItems.map((groupItem) => ({
        ...groupItem,
        ...(groupItem.selected !== undefined ? { selected: checked } : {}),
        ...(groupItem.groupItems !== undefined ? { groupItems: updateGroupItems(groupItem.groupItems) } : {})
      }));

    const updatedOrderTypes = activeOrderTypes?.map((defaultOrderGroup) =>
      defaultOrderGroup.id === orderGroup.id
        ? {
            ...defaultOrderGroup,
            groupItems: updateGroupItems(defaultOrderGroup.groupItems)
          }
        : defaultOrderGroup
    );

    dispatch(ordersMiddleware.updateOrderTypes(selectedOrderType, updatedOrderTypes));
  };

  return (
    <Stack
      direction="row"
      borderBottom={`1px solid ${theme.palette.primary.light}`}
      px={paddings.all24}
      py={paddings.all12}
      gap={2}
    >
      <Stack direction="row" flexBasis={2} flexGrow={2}>
        <FormGroup>
          <FormControlLabel
            control={
              <OrderGroupCheckbox
                checkedColor={theme.palette.primary.main}
                checkedIcon={<WhiteCheckedIcon />}
                onChange={handleAllSelection}
                checked={!!orderGroup?.id && isEverythingSelected}
                indeterminate={!(!!orderGroup?.id && isEverythingSelected) ? atLeastOneSelectedItemExists : undefined}
              />
            }
            label={<Box sx={{ color: theme.palette.secondary['800'] }}>{orderGroup.title}</Box>}
          />
        </FormGroup>
      </Stack>
      <Stack direction="row" flexBasis={10} flexGrow={10} flexWrap="wrap">
        {orderGroup.groupItems.map((groupItem) => (
          <Stack flexBasis="50%" key={groupItem.id}>
            <OrderGroupItem groupItem={groupItem} orderGroupId={orderGroup.id} />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default GroupItemsWrapper;
