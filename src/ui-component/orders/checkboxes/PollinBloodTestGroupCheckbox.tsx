import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Checkbox, FormControlLabel, FormGroup, Stack } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { ordersMiddleware, ordersSelector } from '@redux/slices/orders';
import { IOrderGroup, IOrderGroupItem, IOrderGroupsCollection } from 'types/reduxTypes/ordersStateTypes';

import CollapseMenuArrowDownIcon from '@ui-component/orders/CollapseMenuArrowDownIcon';
import TestTypeChip from '@ui-component/orders/TestTypeChip';

const PollinBloodTestGroupCheckbox = (props: {
  orderGroup: IOrderGroup;
  defaultGroupItem: IOrderGroupItem;
  onCollapseClick: (event: React.MouseEvent<HTMLDivElement>, collapseId: string) => void;
  isCollapseOpen: (collapseId: string) => boolean;
}) => {
  const { orderGroup, defaultGroupItem, onCollapseClick, isCollapseOpen } = props;
  const orderGroupsCollections = useSelector(ordersSelector.orderGroups);
  const selectedOrderType = useSelector(ordersSelector.selectedOrderType);

  const activeOrderGroups = useMemo(
    () =>
      orderGroupsCollections?.find((collection: IOrderGroupsCollection) => collection.orderTypeId === selectedOrderType)
        ?.groups,
    [orderGroupsCollections, selectedOrderType]
  );

  const isEverythingSelectedInGroupItems = (groupItem: IOrderGroupItem) =>
    groupItem?.groupItems?.find((childGroupItem) => childGroupItem?.selected === false)?.selected !== false;

  const atLeastOneSelectedItemInGroupItems = (groupItem: IOrderGroupItem) =>
    !isEverythingSelectedInGroupItems(groupItem) &&
    groupItem?.groupItems?.find((childGroupItem) => childGroupItem?.selected === true)?.selected === true;

  const handleTestGroupSelectUnselect = (event: React.ChangeEvent<HTMLInputElement>, groupItemId: string) => {
    const { checked } = event.target;

    const updatedOrderGroups = activeOrderGroups?.map((defaultOrderGroup: IOrderGroup) => {
      const isDefaultGroupIdValid =
        defaultOrderGroup.groupItems.find((groupItem) => groupItem.id === groupItemId) &&
        defaultOrderGroup.id === orderGroup.id;

      if (isDefaultGroupIdValid) {
        return {
          ...defaultOrderGroup,
          groupItems: defaultOrderGroup.groupItems.map((groupItem) => {
            if (groupItem.id === groupItemId) {
              return {
                ...groupItem,
                selected: checked,
                groupItems: groupItem?.groupItems?.map((childGroupItem) => ({
                  ...childGroupItem,
                  selected: checked
                }))
              };
            }

            return groupItem;
          })
        };
      }

      return defaultOrderGroup;
    });

    dispatch(ordersMiddleware.updateOrderGroups(selectedOrderType, updatedOrderGroups));
  };

  return (
    <FormGroup>
      <FormControlLabel
        label={defaultGroupItem.title}
        control={
          <>
            <Checkbox
              checked={isEverythingSelectedInGroupItems(defaultGroupItem)}
              indeterminate={atLeastOneSelectedItemInGroupItems(defaultGroupItem)}
              onChange={(event) => handleTestGroupSelectUnselect(event, defaultGroupItem.id)}
            />
            <TestTypeChip type={defaultGroupItem.type} />
            <Stack onClick={(event) => onCollapseClick(event, defaultGroupItem.id)} order={3}>
              <CollapseMenuArrowDownIcon isOpen={isCollapseOpen(defaultGroupItem.id)} />
            </Stack>
          </>
        }
      />
    </FormGroup>
  );
};

export default PollinBloodTestGroupCheckbox;
