import React, { ReactNode } from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import { paddings } from 'themes/themeConstants';

interface SectionWrapperWithTitleProps {
  title: ReactNode;
  children: ReactNode;
}

const SectionWrapperWithTitle = ({ title, children }: SectionWrapperWithTitleProps) => (
  <Grid py={paddings.topBottom24} px={paddings.leftRight50}>
    <Typography
      sx={{
        fontWeight: 400,
        color: (theme) => theme.palette.secondary[800],
        fontSize: (theme) => theme.typography.pxToRem(17)
      }}
    >
      {title}
    </Typography>
    <Grid pt={paddings.top24} px={paddings.leftRight20}>
      {children}
    </Grid>
    <Divider sx={{ color: (theme) => theme.palette.primary.light, py: paddings.topBottom12 }} />
  </Grid>
);

export default SectionWrapperWithTitle;
