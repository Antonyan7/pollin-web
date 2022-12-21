import React from 'react';
import { useSelector } from 'react-redux';
import { Checkbox, FormControlLabel, FormGroup, Grid, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { dispatch } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { paddings } from 'themes/themeConstants';
import { IOrderGroup } from 'types/reduxTypes/resultsStateTypes';

import GroupItems from '@ui-component/orders/GroupItems';

const GroupItemsWrapper = (props: { orderGroup: IOrderGroup }) => {
  const theme = useTheme();
  const { orderGroup } = props;
  const orderGroups = useSelector(resultsSelector.orderGroups);

  const isEverythingSelected = () => {
    const flatMapOfGroupItems = orderGroup.groupItems.flatMap((groupItem) => groupItem);
    const flatMapOfGroupItemsChildren = orderGroup.groupItems.flatMap((groupItem) => groupItem.groupItems);

    if (
      flatMapOfGroupItems.find((groupItem) => groupItem?.selected === false)?.selected === false ||
      flatMapOfGroupItemsChildren.find((groupItem) => groupItem?.selected === false)?.selected === false
    ) {
      return false;
    }

    return true;
  };

  const atLeastOneSelectedItemExists = () => {
    const flatMapOfGroupItems = orderGroup.groupItems.flatMap((groupItem) => groupItem);
    const flatMapOfGroupItemsChildren = orderGroup.groupItems.flatMap((groupItem) => groupItem.groupItems);

    if (
      !isEverythingSelected() &&
      (flatMapOfGroupItems.find((groupItem) => groupItem?.selected === true)?.selected === true ||
        flatMapOfGroupItemsChildren.find((groupItem) => groupItem?.selected === true)?.selected === true)
    ) {
      return true;
    }

    return false;
  };

  const handleSelectUnselectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    const updatedOrderGroups = orderGroups.map((defaultOrderGroup) => {
      if (defaultOrderGroup.id === orderGroup.id) {
        return {
          ...defaultOrderGroup,
          groupItems: defaultOrderGroup.groupItems.map((groupItem) => ({
            ...groupItem,
            selected: checked,
            groupItems: groupItem?.groupItems?.map((childGroupItem) => ({
              ...childGroupItem,
              selected: checked,
              groupItems: childGroupItem?.groupItems?.map((panelChildItem) => ({
                ...panelChildItem,
                selected: checked
              }))
            }))
          }))
        };
      }

      return defaultOrderGroup;
    });

    dispatch(resultsMiddleware.updateOrderGroups(updatedOrderGroups));
  };

  return (
    <Stack borderBottom={`1px solid ${theme.palette.primary.light}`}>
      <Grid container xs={12} justifyItems="center" spacing={2} px={paddings.all24} py={paddings.all12}>
        <Grid item xs={2}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!orderGroup?.id && isEverythingSelected()}
                  indeterminate={atLeastOneSelectedItemExists()}
                  onChange={handleSelectUnselectAll}
                />
              }
              label={orderGroup.title}
            />
          </FormGroup>
        </Grid>
        <Grid item xs={5}>
          <GroupItems orderGroup={orderGroup} key={1} isEvenItemsShouldBeDisplayed />
        </Grid>
        <Grid item xs={5}>
          <GroupItems orderGroup={orderGroup} key={2} isEvenItemsShouldBeDisplayed={false} />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default GroupItemsWrapper;
