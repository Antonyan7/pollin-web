import React from 'react';
import { useSelector } from 'react-redux';
import { Checkbox, FormControlLabel, FormGroup, Stack } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { IGroupItem, IOrderGroup } from 'types/reduxTypes/resultsStateTypes';

import CollapseMenuArrowDownIcon from '@ui-component/orders/CollapseMenuArrowDownIcon';
import TestTypeChip from '@ui-component/orders/TestTypeChip';

const TestPanelGroupCheckbox = (props: {
  orderGroup: IOrderGroup;
  parentGroupId: string;
  secondaryGroupItem: IGroupItem;
  onCollapseClick: (event: React.MouseEvent<HTMLDivElement>, collapseId: string) => void;
  isCollapseOpen: (collapseId: string) => boolean;
}) => {
  const { orderGroup, parentGroupId, secondaryGroupItem, onCollapseClick, isCollapseOpen } = props;
  const orderGroups = useSelector(resultsSelector.orderGroups);

  const handlePanelGroupSelectUnselect = (
    event: React.ChangeEvent<HTMLInputElement>,
    groupItemId: string,
    secondaryGroupItemId: string
  ) => {
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
                groupItems: groupItem?.groupItems?.map((childGroupItem) => {
                  if (childGroupItem.id === secondaryGroupItemId) {
                    return {
                      ...childGroupItem,
                      selected: checked,
                      groupItems: childGroupItem?.groupItems?.map((panelChildItem) => ({
                        ...panelChildItem,
                        selected: checked
                      }))
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

    dispatch(resultsMiddleware.updateOrderGroups(updatedOrderGroups));
  };

  return (
    <FormGroup sx={{ ml: 3 }}>
      <FormControlLabel
        label={secondaryGroupItem.title}
        control={
          <>
            <Checkbox
              checked={secondaryGroupItem.selected}
              onChange={(event) => handlePanelGroupSelectUnselect(event, parentGroupId, secondaryGroupItem.id)}
            />
            <TestTypeChip type={secondaryGroupItem.type} />
            <Stack onClick={(event) => onCollapseClick(event, secondaryGroupItem.id)} order={3}>
              <CollapseMenuArrowDownIcon isOpen={isCollapseOpen(secondaryGroupItem.id)} />
            </Stack>
          </>
        }
      />
    </FormGroup>
  );
};

export default TestPanelGroupCheckbox;
