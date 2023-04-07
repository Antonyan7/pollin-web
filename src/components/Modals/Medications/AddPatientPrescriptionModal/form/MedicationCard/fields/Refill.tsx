import React, { useCallback, useEffect, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { DropdownOptionType, IDropdownOption } from '@axios/patientEmr/managerPatientEmrTypes';
import { getDropdownByType } from '@components/MedicalBackground/helpers';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/system';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { dispatch, useAppSelector } from 'redux/hooks';
import { borderRadius, borders } from 'themes/themeConstants';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

const RefillField = ({ index }: { index: number }) => {
  const [t] = useTranslation();
  const labelFieldName = `medications.${index}.refill`;
  const dropdownOptions = useAppSelector(patientsSelector.dropdownOptions);
  const isDropdownOptionsLoading = useAppSelector(patientsSelector.isDropdownOptionsLoading);
  const [refillDropdownOptions, setRefillDropdownOptions] = useState<IDropdownOption[]>();

  const { control } = useFormContext();
  const { field, fieldState } = useController({ name: labelFieldName, control });
  const { onBlur, onChange, ...fieldProps } = field;
  const { error } = fieldState;
  const [inputValue, setInputValue] = useState(field.value);
  const labelHelperText = error?.message;
  const labelErrorText = !!error?.message;
  const assignLabel = t(Translation.MODAL_PRESCRIPTIONS_REFILL);
  const theme = useTheme();

  const onInputChange = useCallback((_: React.SyntheticEvent, value: string) => {
    setInputValue(value);
  }, []);

  useEffect(() => {
    dispatch(patientsMiddleware.getMedicationDropdownOptions());
  }, []);

  useEffect(() => {
    if (dropdownOptions?.length) {
      const refillOptions = getDropdownByType(dropdownOptions, DropdownOptionType.Refill)?.options;

      if (refillOptions) {
        setRefillDropdownOptions(refillOptions);
      }
    }
  }, [dropdownOptions]);

  return (
    <Grid item xs={12}>
      <BaseDropdownWithLoading
        inputValue={inputValue}
        isLoading={isDropdownOptionsLoading}
        ListboxProps={{
          style: {
            maxHeight: 220,
            borderRadius: `${borderRadius.radius8}`,
            border: `${borders.solid2px} ${theme.palette.primary.main}`
          }
        }}
        id={labelFieldName}
        options={(refillDropdownOptions as IDropdownOption[]) ?? []}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => (typeof option === 'object' ? option.title : option)}
        onChange={(_, value) => {
          if (value && typeof value === 'object' && 'id' in value) {
            onChange(value.id);
          }
        }}
        onBlur={onBlur}
        clearIcon={<CloseIcon onClick={() => onChange('')} fontSize="small" />}
        onInputChange={(event: React.SyntheticEvent, value: string) => {
          onInputChange(event, value);
        }}
        renderInputProps={{
          ...fieldProps,
          label: assignLabel,
          name: labelFieldName,
          helperText: labelHelperText,
          error: labelErrorText
        }}
      />
    </Grid>
  );
};

export default RefillField;
