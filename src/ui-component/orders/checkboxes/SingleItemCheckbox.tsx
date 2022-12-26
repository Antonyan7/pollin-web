import React from 'react';
import { useSelector } from 'react-redux';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { IOrderGroup, IOrderGroupItem } from 'types/reduxTypes/resultsStateTypes';

const SingleItemCheckbox = (props: { orderGroup: IOrderGroup; defaultGroupItem: IOrderGroupItem }) => {
  const { orderGroup, defaultGroupItem } = props;
  const orderGroups = useSelector(resultsSelector.orderGroups);

  const handleSingleTestTypeSelectUnselect = (event: React.ChangeEvent<HTMLInputElement>, groupItemId: string) => {
    const { checked } = event.target;

    const updatedOrderGroups = orderGroups.map((defaultOrderGroup) => {
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
