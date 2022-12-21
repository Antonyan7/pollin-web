import React from 'react';
import { useSelector } from 'react-redux';
import { Checkbox, FormControlLabel, FormGroup, Stack } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { IGroupItem, IOrderGroup } from 'types/reduxTypes/resultsStateTypes';

import CollapseMenuArrowDownIcon from '@ui-component/orders/CollapseMenuArrowDownIcon';
import TestTypeChip from '@ui-component/orders/TestTypeChip';

const PollinBloodTestGroupCheckbox = (props: {
  orderGroup: IOrderGroup;
  defaultGroupItem: IGroupItem;
  onCollapseClick: (event: React.MouseEvent<HTMLDivElement>, collapseId: string) => void;
  isCollapseOpen: (collapseId: string) => boolean;
}) => {
  const { orderGroup, defaultGroupItem, onCollapseClick, isCollapseOpen } = props;
  const orderGroups = useSelector(resultsSelector.orderGroups);

  const isEverythingSelectedInGroupItems = (groupItem: IGroupItem) =>
    groupItem?.groupItems?.find((childGroupItem) => childGroupItem?.selected === false)?.selected !== false;

  const atLeastOneSelectedItemInGroupItems = (groupItem: IGroupItem) =>
    !isEverythingSelectedInGroupItems(groupItem) &&
    groupItem?.groupItems?.find((childGroupItem) => childGroupItem?.selected === true)?.selected === true;

  const handleTestGroupSelectUnselect = (event: React.ChangeEvent<HTMLInputElement>, groupItemId: string) => {
    const { checked } = event.target;

    const updatedOrderGroups = orderGroups.map((defaultOrderGroup: IOrderGroup) => {
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

    dispatch(resultsMiddleware.updateOrderGroups(updatedOrderGroups));
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
