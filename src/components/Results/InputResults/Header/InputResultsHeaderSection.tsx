import React from 'react';
import { Grid, Typography } from '@mui/material';
import { paddings } from 'themes/themeConstants';

import { InputResultsHeaderSectionProps } from '../types';

const InputResultsHeaderSection: React.FC<InputResultsHeaderSectionProps> = ({ title, rows }) => (
  <Grid pt={paddings.top8} flexBasis="maxContent" flexGrow={0.1} key={title}>
    <Grid display="flex" flexDirection="column" rowGap={1.25}>
      <Typography variant="h5" component="h5" fontWeight={600}>
        {title}
      </Typography>
      {rows.map(
        (row) =>
          row?.value && (
            <Grid key={row.label} display="flex" justifyContent="space-between">
              <Typography variant="h5" component="h5" fontWeight={500}>
                {row.label}:
              </Typography>
              <Typography color="grey.500">{row.value}</Typography>
            </Grid>
          )
      )}
    </Grid>
  </Grid>
);

export default InputResultsHeaderSection;
