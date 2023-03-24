import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { styled } from '@mui/system';
import { Translation } from 'constants/translations';
import { FinalResultType, UnitResultType } from 'types/reduxTypes/resultsStateTypes';

import useTestResultsContext from '../../hooks/useTestResultsContext';
import { IMeasurementListField, InputResultTestType } from '../../types';

const StyledKeyboardArrowDownIcon = styled(KeyboardArrowDownIcon)(({ theme }) => ({
  fill: theme.palette.primary.main
}));

const ResultTypeField = ({ name }: IMeasurementListField) => {
  const [t] = useTranslation();
  const { type } = useTestResultsContext();
  const { control } = useFormContext();

  const resultTypeOptions =
    type === InputResultTestType.InHouse ? Object.entries(FinalResultType) : Object.entries(UnitResultType);
  const { field } = useController({
    name,
    control
  });

  return (
    <FormControl sx={{ width: '165px' }}>
      <InputLabel>{t(Translation.PAGE_INPUT_RESULTS_TEST_MEASUREMENT_LIST_FIELD_NAME_RESULT_TYPE)}</InputLabel>
      <Select
        label={t(Translation.PAGE_INPUT_RESULTS_TEST_MEASUREMENT_LIST_FIELD_NAME_RESULT_TYPE)}
        value={field.value}
        onChange={(e) => field.onChange(e.target.value)}
        IconComponent={StyledKeyboardArrowDownIcon}
      >
        {resultTypeOptions.map((resultMeasurementType) => {
          const [id, label] = resultMeasurementType;

          return (
            <MenuItem key={id} value={id}>
              {label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default ResultTypeField;
