import React from 'react';
import { Grid, GridProps, IconButton, Stack, Typography } from '@mui/material';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons';
import { format } from 'date-fns';

interface ToolbarProps {
  date: number | Date;
  onClickNext: () => void;
  onClickPrev: () => void;
  sx?: GridProps['sx'];
}

const Toolbar = ({ date, onClickNext, onClickPrev, sx, ...others }: ToolbarProps) => (
  <Grid alignItems="center" container justifyContent="center" spacing={3} {...others} sx={{ pb: 3 }}>
    <Grid item>
      <Stack direction="row" alignItems="center" spacing={3}>
        <IconButton onClick={onClickPrev} size="large">
          <IconChevronLeft />
        </IconButton>
        <Typography variant="h3" color="textPrimary">
          {format(date, 'EEEE')}
        </Typography>
        <IconButton onClick={onClickNext} size="large">
          <IconChevronRight />
        </IconButton>
      </Stack>
    </Grid>
  </Grid>
);

export default Toolbar;
