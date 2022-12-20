import React from 'react';
import { Checkbox, FormControlLabel, FormGroup, Grid, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { paddings } from 'themes/themeConstants';
import { IOrderGroup } from 'types/reduxTypes/resultsStateTypes';

import GroupItems from '@ui-component/orders/GroupItems';

const GroupItemsWrapper = (props: { orderGroup: IOrderGroup }) => {
  const theme = useTheme();
  const { orderGroup } = props;

  return (
    <Stack borderBottom={`1px solid ${theme.palette.primary.light}`}>
      <Grid container xs={12} justifyItems="center" spacing={2} px={paddings.all24} py={paddings.all12}>
        <Grid item xs={2}>
          <FormGroup>
            <FormControlLabel control={<Checkbox checked={false} />} label={orderGroup.title} />
          </FormGroup>
        </Grid>
        <Grid item xs={5}>
          <GroupItems orderGroup={orderGroup} isEvenItemsShouldBeDisplayed />
        </Grid>
        <Grid item xs={5}>
          <GroupItems orderGroup={orderGroup} isEvenItemsShouldBeDisplayed={false} />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default GroupItemsWrapper;
