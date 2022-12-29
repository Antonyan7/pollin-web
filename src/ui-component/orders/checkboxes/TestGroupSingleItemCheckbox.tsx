import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Checkbox, FormControlLabel } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { IOrderGroup, IOrderGroupItem, IOrderGroupsCollection } from 'types/reduxTypes/resultsStateTypes';

const TestGroupSingleItemCheckbox = (props: {
  orderGroup: IOrderGroup;
  secondaryGroupItem: IOrderGroupItem;
  parentGroupId: string;
}) => {
  const { orderGroup, secondaryGroupItem, parentGroupId } = props;
  const orderGroupsCollections = useSelector(resultsSelector.orderGroups);

  const selectedOrderType = useSelector(resultsSelector.selectedOrderType);

  const activeOrderGroups = useMemo(
    () =>
      orderGroupsCollections?.find((collection: IOrderGroupsCollection) => collection.orderTypeId === selectedOrderType)
        ?.groups,
    [orderGroupsCollections, selectedOrderType]
  );

  const handleTestGroupSingleItemSelectUnselect = (
    event: React.ChangeEvent<HTMLInputElement>,
    groupItemId: string,
    secondaryGroupItemId: string
  ) => {
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
                groupItems: groupItem?.groupItems?.map((childGroupItem) => {
                  if (childGroupItem.id === secondaryGroupItemId) {
                    return {
                      ...childGroupItem,
                      selected: checked
                    };
                  }

                  return childGroupItem;
                })
              };
            }

            return groupItem;
          })
        };
      }

      return defaultOrderGroup;
    });

    dispatch(resultsMiddleware.updateOrderGroups(selectedOrderType, updatedOrderGroups));
  };

  return (
    <FormControlLabel
      label={secondaryGroupItem.title}
      control={
        <Checkbox
          checked={secondaryGroupItem.selected}
          onChange={(event) => handleTestGroupSingleItemSelectUnselect(event, parentGroupId, secondaryGroupItem.id)}
        />
      }
    />
  );
};

export default TestGroupSingleItemCheckbox;
