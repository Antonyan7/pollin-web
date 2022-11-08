import React from 'react';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { styled } from '@mui/system';
import { Translation } from 'constants/translations';
import { TestResultMeasurementType } from 'types/reduxTypes/resultsStateTypes';

import { IMeasurementListField } from '../../types';

const StyledKeyboardArrowDownIcon = styled(KeyboardArrowDownIcon)(({ theme }) => ({
  fill: theme.palette.primary.main
}));

const ResultTypeField = ({ name, control }: IMeasurementListField) => {
  const [t] = useTranslation();

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
        {Object.values(TestResultMeasurementType).map((resultMeasurementType) => (
          <MenuItem key={resultMeasurementType} value={resultMeasurementType}>
            {resultMeasurementType}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ResultTypeField;
