import React from 'react';
import { Card, CardContent, Grid, Typography, useTheme } from '@mui/material';
import { borders } from 'themes/themeConstants';
import { GenericCardProps } from 'types';

interface TestResultCardProps extends GenericCardProps {
  backgroundColor: string;
}

const TestResultCard = ({ primary, secondary, color, backgroundColor }: TestResultCardProps) => {
  const theme = useTheme();

  return (
    <Card sx={{ borderLeft: borders.solid10px, borderColor: color, background: backgroundColor }}>
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ color: theme.palette.grey[800], fontSize: 12, fontWeight: 500 }}>
              {primary}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h3" sx={{ fontWeight: 500, pt: 1, fontSize: 16, color: theme.palette.grey[800] }}>
              {secondary}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TestResultCard;
