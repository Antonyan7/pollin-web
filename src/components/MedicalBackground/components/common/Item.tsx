import React, { FC } from 'react';
import { Grid, GridProps } from '@mui/material';
import { paddings } from 'themes/themeConstants';

import FieldWrapper from './FieldWrapper';

interface ItemProps extends Partial<GridProps> {
  title: string;
  index?: number;
  value?: number | string | string[];
  note?: string;
  isHeader?: boolean;
}

const Item: FC<ItemProps> = ({ title, index, value, note, isHeader, ...props }) => {
  const renderedValue = Array.isArray(value)
    ? value?.map((valueItem, valueIndex) => (
        <Grid
          // TODO better key that a value TEAMA-5498
          key={valueItem}
          {...(valueIndex > 1 && {
            py: paddings.topBottom4
          })}
        >
          {valueItem}
        </Grid>
      ))
    : value;

  return (
    <FieldWrapper fieldName={title} componentIndex={index} hasNote={!!note} isHeader={isHeader} {...props}>
      <Grid item container xs={5} direction="column" justifyContent="space-between">
        <Grid>{renderedValue}</Grid>
        {note && <Grid>{note ?? ''}</Grid>}
      </Grid>
    </FieldWrapper>
  );
};

export default Item;
