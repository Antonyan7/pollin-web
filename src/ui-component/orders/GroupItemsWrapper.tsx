import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Checkbox, FormControlLabel, FormGroup, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { dispatch } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { paddings } from 'themes/themeConstants';
import { IOrderGroup, IOrderGroupItem } from 'types/reduxTypes/resultsStateTypes';

import OrderGroupItem from '@ui-component/orders/OrderGroupItem';

import { isAllGroupItemSelected, isAnyGroupItemSelected } from './helpers';

interface GroupItemsWrapperProps {
  orderGroup: IOrderGroup;
}

const GroupItemsWrapper = ({ orderGroup }: GroupItemsWrapperProps) => {
  const theme = useTheme();
  const orderGroups = useSelector(resultsSelector.orderGroups);

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
        selected: checked,
        ...(groupItem.groupItems !== undefined ? { groupItems: updateGroupItems(groupItem.groupItems) } : {})
      }));

    const updatedOrderGroups = orderGroups.map((defaultOrderGroup) =>
      defaultOrderGroup.id === orderGroup.id
        ? {
            ...defaultOrderGroup,
            groupItems: updateGroupItems(defaultOrderGroup.groupItems)
          }
        : defaultOrderGroup
    );

    dispatch(resultsMiddleware.updateOrderGroups(updatedOrderGroups));
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
              <Checkbox
                checked={!!orderGroup?.id && isEverythingSelected}
                indeterminate={!(!!orderGroup?.id && isEverythingSelected) ? atLeastOneSelectedItemExists : undefined}
                onChange={handleAllSelection}
              />
            }
            label={orderGroup.title}
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
