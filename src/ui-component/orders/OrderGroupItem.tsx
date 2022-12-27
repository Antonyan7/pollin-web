import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Checkbox, CheckboxProps, Collapse, FormControlLabel, Stack, StackProps } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { IOrderGroupItem } from 'types/reduxTypes/resultsStateTypes';

import CollapseMenuArrowDownIcon from '@ui-component/orders/CollapseMenuArrowDownIcon';
import TestTypeChip from '@ui-component/orders/TestTypeChip';

import { isAllGroupItemSelected, isAnyGroupItemSelected } from './helpers';

interface Props {
  groupItem: IOrderGroupItem;
  orderGroupId: string;
  paddingFactor?: number;
}

const OrderGroupItem = ({ groupItem, orderGroupId, paddingFactor = 0 }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const orderGroups = useSelector(resultsSelector.orderGroups);

  const onSelectChange: CheckboxProps['onChange'] = (event) => {
    const { checked } = event.target;

    event.stopPropagation();

    const updateOrderItems = (groupItems: IOrderGroupItem[], inherited = false): IOrderGroupItem[] =>
      groupItems.map((item) => {
        if (item.id === groupItem.id || inherited) {
          return {
            ...item,
            selected: checked,
            ...(item.groupItems !== undefined
              ? {
                  groupItems: updateOrderItems(item.groupItems, true)
                }
              : {})
          };
        }

        if (item.groupItems !== undefined) {
          const newGroupItems = updateOrderItems(item.groupItems);

          return {
            ...item,
            groupItems: newGroupItems,
            ...(newGroupItems.length > 0
              ? { selected: newGroupItems.reduce((isSelected, { selected }) => isSelected && !!selected, true) }
              : {})
          };
        }

        return { ...item };
      });

    const updatedOrderGroups = orderGroups.map((orderGroup) => {
      if (orderGroup.id === orderGroupId) {
        return {
          ...orderGroup,
          groupItems: updateOrderItems(orderGroup.groupItems)
        };
      }

      return { ...orderGroup };
    });

    dispatch(resultsMiddleware.updateOrderGroups(updatedOrderGroups));
  };

  const isEverythingSelected = useMemo(() => {
    if (groupItem.groupItems !== undefined) {
      return groupItem.selected && isAllGroupItemSelected(groupItem.groupItems);
    }

    return groupItem.selected ?? false;
  }, [groupItem]);

  const atLeastOneSelectedItemExists = useMemo(() => {
    if (groupItem.groupItems !== undefined && groupItem.groupItems.length > 0 && !isEverythingSelected) {
      return isAnyGroupItemSelected(groupItem.groupItems);
    }

    return undefined;
  }, [groupItem, isEverythingSelected]);

  const onCollapseClick: StackProps['onClick'] = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <Stack pl={paddingFactor * 4}>
      <FormControlLabel
        label={groupItem.title}
        control={
          <>
            <Checkbox
              checked={isEverythingSelected}
              indeterminate={atLeastOneSelectedItemExists}
              onChange={onSelectChange}
            />
            {groupItem.groupItems && groupItem.groupItems.length > 0 && (
              <>
                <TestTypeChip type={groupItem.type} />
                <Stack onClick={onCollapseClick} order={3}>
                  <CollapseMenuArrowDownIcon isOpen={isOpen} />
                </Stack>
              </>
            )}
          </>
        }
      />
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        {groupItem.groupItems?.map((item) => (
          <OrderGroupItem groupItem={item} orderGroupId={orderGroupId} paddingFactor={1} key={item.id} />
        ))}
      </Collapse>
    </Stack>
  );
};

export default OrderGroupItem;
