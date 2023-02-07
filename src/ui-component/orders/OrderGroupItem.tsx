import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, CheckboxProps, Collapse, FormControlLabel, ListItem, Stack, StackProps, useTheme } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { ordersMiddleware, ordersSelector } from '@redux/slices/orders';
import { IOrderGroupItem, IOrderTypesCollection } from 'types/reduxTypes/ordersStateTypes';

import { CheckedIcon } from '@assets/icons/CheckedIcon';
import CollapseMenuArrowDownIcon from '@ui-component/orders/CollapseMenuArrowDownIcon';
import TestTypeChip from '@ui-component/orders/TestTypeChip';

import { isAllGroupItemSelected, isAnyGroupItemSelected } from './helpers';
import OrderGroupCheckbox from './OrderGroupCheckbox';

interface Props {
  groupItem: IOrderGroupItem;
  orderGroupId: string;
  paddingFactor?: number;
}

const OrderGroupItem = ({ groupItem, orderGroupId, paddingFactor = 0 }: Props) => {
  const theme = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const orderTypes = useSelector(ordersSelector.orderTypes);
  const selectedOrderType = useSelector(ordersSelector.selectedOrderType);

  const activeOrderTypes = useMemo(
    () => orderTypes?.find((collection: IOrderTypesCollection) => collection.orderTypeId === selectedOrderType)?.groups,
    [orderTypes, selectedOrderType]
  );

  const onSelectChange: CheckboxProps['onChange'] = (event) => {
    const { checked } = event.target;

    event.stopPropagation();

    const updateOrderItems = (groupItems: IOrderGroupItem[], inherited = false): IOrderGroupItem[] =>
      groupItems.map((item) => {
        if (item.id === groupItem.id || inherited) {
          return {
            ...item,
            ...(item.selected !== undefined
              ? {
                  selected: checked
                }
              : {
                  ...(item.groupItems !== undefined
                    ? {
                        groupItems: updateOrderItems(item.groupItems, true)
                      }
                    : {})
                })
          };
        }

        if (item.groupItems !== undefined) {
          return {
            ...item,
            groupItems: updateOrderItems(item.groupItems)
          };
        }

        return item;
      });

    const updatedOrderTypes = activeOrderTypes?.map((orderGroup) => {
      if (orderGroup.id === orderGroupId) {
        return {
          ...orderGroup,
          groupItems: updateOrderItems(orderGroup.groupItems)
        };
      }

      return orderGroup;
    });

    dispatch(ordersMiddleware.updateOrderTypes(selectedOrderType, updatedOrderTypes));
  };

  const isEverythingSelected = useMemo(() => {
    if (groupItem.selected === undefined && groupItem.groupItems !== undefined) {
      return isAllGroupItemSelected(groupItem.groupItems);
    }

    return groupItem.selected ?? false;
  }, [groupItem]);

  const atLeastOneSelectedItemExists = useMemo(() => {
    if (groupItem.selected === undefined && groupItem.groupItems !== undefined && !isEverythingSelected) {
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
      {groupItem.groupItems === undefined && groupItem.selected === undefined ? (
        <ListItem sx={{ display: 'list-item', px: 1 }}>{groupItem.title}</ListItem>
      ) : (
        <FormControlLabel
          label={<Box sx={{ color: theme.palette.secondary['800'] }}>{groupItem.title}</Box>}
          sx={{ display: 'inline-flex' }}
          control={
            <>
              <OrderGroupCheckbox
                checkedIcon={<CheckedIcon />}
                checkedColor={theme.palette.primary.light}
                onChange={onSelectChange}
                checked={isEverythingSelected}
                indeterminate={atLeastOneSelectedItemExists}
              />
              {groupItem.groupItems && groupItem.groupItems.length > 0 && (
                <>
                  <TestTypeChip label={groupItem.label} type={groupItem.type} />
                  <Stack onClick={onCollapseClick} order={3}>
                    <CollapseMenuArrowDownIcon isOpen={isOpen} />
                  </Stack>
                </>
              )}
            </>
          }
        />
      )}
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        {groupItem.groupItems?.map((item) => (
          <OrderGroupItem groupItem={item} orderGroupId={orderGroupId} paddingFactor={1} key={item.id} />
        ))}
      </Collapse>
    </Stack>
  );
};

export default OrderGroupItem;
