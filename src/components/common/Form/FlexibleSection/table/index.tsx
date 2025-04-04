import React, { FC } from 'react';
import { DropdownOptionType } from '@axios/patientEmr/managerPatientEmrTypes';
import { DeleteTwoTone } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import { paddings } from 'themes/themeConstants';
import { v5 as uuidv5 } from 'uuid';

import { Dropdown } from '../../Dropdown';
import { FormInput } from '../../FormInput';
import { FlexibleItemType, FlexibleSectionTableProps } from '../../types';

const FlexibleSectionTable: FC<FlexibleSectionTableProps> = ({ title, rows, onDelete, index, parentFieldName }) => (
  <Grid
    sx={(theme) => ({
      background: theme.palette.primary.light,
      px: paddings.leftRight16,
      pt: paddings.top8,
      pb: paddings.bottom24,
      borderRadius: 1.5
    })}
  >
    <Grid display="flex" justifyContent="space-between" pt={paddings.top24} pb={paddings.bottom16} alignItems="center">
      <Typography variant="h5" fontWeight={500}>
        {title}
      </Typography>
      <IconButton onClick={() => onDelete?.(index as number)}>
        <DeleteTwoTone color="primary" />
      </IconButton>
    </Grid>
    <Grid container>
      {rows?.map((row) => {
        // Dynamic row
        if (!Array.isArray(row)) {
          return row(index as number, parentFieldName as string);
        }

        return row.map((item, rowIndex: number) => {
          const rowColumnsCount = 12;
          const itemSize = Math.round(rowColumnsCount / row.length);
          const finalFieldName = parentFieldName ? `${parentFieldName}.${index}.${item.fieldName}` : item.fieldName;

          let renderedItem;

          if (item.type === FlexibleItemType.Input) {
            renderedItem = <FormInput label={item.label} fieldName={finalFieldName} key={item.fieldName} />;
          }

          if (item.type === FlexibleItemType.MultilineInput) {
            renderedItem = <FormInput label={item.label} fieldName={finalFieldName} key={item.fieldName} multiline />;
          }

          if (item.type === FlexibleItemType.Dropdown) {
            renderedItem = (
              <Dropdown
                label={item.label}
                fieldName={finalFieldName}
                dropdownType={item.dropdownType as DropdownOptionType}
                key={item.fieldName}
              />
            );
          }

          const hashKey = uuidv5(JSON.stringify(item).concat(rowIndex.toString()), uuidv5.URL);

          return (
            <Grid key={hashKey} item xs={itemSize} px={paddings.leftRight4} py={paddings.topBottom4}>
              {renderedItem ?? null}
            </Grid>
          );
        });
      })}
    </Grid>
  </Grid>
);

export default FlexibleSectionTable;
