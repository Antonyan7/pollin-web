import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { paddings } from 'themes/themeConstants';

import FieldWrapper from './FieldWrapper';

interface ItemProps {
  title: string;
  index: number;
  value: string | string[];
  note: string;
}

const Item: FC<ItemProps> = ({ title, index, value, note }) => {
  const renderedValue = Array.isArray(value)
    ? value.map((valueItem, valueIndex) => (
        <Grid
          {...(valueIndex > 1 && {
            py: paddings.top8
          })}
        >
          {valueItem}
        </Grid>
      ))
    : value;

  return (
    <FieldWrapper fieldName={title} componentIndex={index}>
      <Grid item container xs={5} direction="column" justifyContent="space-between">
        <Grid>{renderedValue}</Grid>
        <Grid>{note ?? '-'}</Grid>
      </Grid>
    </FieldWrapper>
  );
};

export default Item;
