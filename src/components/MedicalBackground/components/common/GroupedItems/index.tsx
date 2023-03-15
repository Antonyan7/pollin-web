import React, { FC } from 'react';
import { DeleteTwoTone } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import { paddings } from 'themes/themeConstants';

import { GroupedItemsProps } from './types';

const GroupedItems: FC<GroupedItemsProps> = ({ title, onDelete }) => (
  <Grid
    sx={(theme) => ({
      background: theme.palette.primary.light,
      px: paddings.leftRight16,
      borderRadius: 1.5
    })}
  >
    <Grid display="flex" justifyContent="space-between" pt={paddings.top24} pb={paddings.bottom16} alignItems="center">
      <Typography variant="h5" fontWeight={500}>
        {title}
      </Typography>
      <IconButton onClick={onDelete}>
        <DeleteTwoTone color="primary" />
      </IconButton>
    </Grid>
    {/* Work in progress */}
  </Grid>
);

export default GroupedItems;
