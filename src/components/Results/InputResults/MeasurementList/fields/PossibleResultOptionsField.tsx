import React from 'react';
import { FieldValues, useController, useFormContext, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { Translation } from 'constants/translations';
import { IPossibleResultOptions } from 'types/reduxTypes/resultsStateTypes';

import { IMeasurementListField } from '../../types';

interface PossibleResultOptionsProps extends IMeasurementListField {
  resultOptions: IPossibleResultOptions[];
  showResultOptionsDropdown: boolean;
  register: UseFormRegister<FieldValues>;
}

const StyledKeyboardArrowDownIcon = styled(KeyboardArrowDownIcon)(({ theme }) => ({
  fill: theme.palette.primary.main
}));

const PossibleResultOptionsField = ({
  name,
  resultOptions,
  showResultOptionsDropdown,
  register
}: PossibleResultOptionsProps) => {
  const [t] = useTranslation();
  const testResultNameLabel = t(Translation.PAGE_INPUT_RESULTS_TEST_MEASUREMENT_LIST_FIELD_NAME_RESULT);
  const { control } = useFormContext();
  const { field } = useController({
    name,
    control
  });
  const { value, onChange } = field;

  return showResultOptionsDropdown ? (
    <FormControl fullWidth>
      <InputLabel>{testResultNameLabel}</InputLabel>
      <Select
        label={testResultNameLabel}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        IconComponent={StyledKeyboardArrowDownIcon}
      >
        {resultOptions.map(({ title }: IPossibleResultOptions) => (
          <MenuItem key={title} value={title}>
            {title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ) : (
    <TextField {...register(name)} label={testResultNameLabel} />
  );
};

export default PossibleResultOptionsField;
