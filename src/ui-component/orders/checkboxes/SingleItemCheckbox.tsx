import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { ordersMiddleware, ordersSelector } from '@redux/slices/orders';
import { IOrderGroup, IOrderGroupItem, IOrderGroupsCollection } from 'types/reduxTypes/ordersStateTypes';

const SingleItemCheckbox = (props: { orderGroup: IOrderGroup; defaultGroupItem: IOrderGroupItem }) => {
  const { orderGroup, defaultGroupItem } = props;
  const orderGroupsCollections = useSelector(ordersSelector.orderGroups);

  const selectedOrderType = useSelector(ordersSelector.selectedOrderType);

  const activeOrderGroups = useMemo(
    () =>
      orderGroupsCollections?.find((collection: IOrderGroupsCollection) => collection.orderTypeId === selectedOrderType)
        ?.groups,
    [orderGroupsCollections, selectedOrderType]
  );

  const handleSingleTestTypeSelectUnselect = (event: React.ChangeEvent<HTMLInputElement>, groupItemId: string) => {
    const { checked } = event.target;

    const updatedOrderGroups = activeOrderGroups?.map((defaultOrderGroup) => {
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
        control={
          <Checkbox
            checked={defaultGroupItem.selected}
            onChange={(event) => handleSingleTestTypeSelectUnselect(event, defaultGroupItem.id)}
          />
        }
        label={defaultGroupItem.title}
      />
    </FormGroup>
  );
};

export default SingleItemCheckbox;
