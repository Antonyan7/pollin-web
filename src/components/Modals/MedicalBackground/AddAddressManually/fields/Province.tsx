import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AddManuallyAddressModalProps } from '@axios/patientEmr/managerPatientEmrTypes';
import CloseIcon from '@mui/icons-material/Close';
import { Grid, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';
import { borderRadius, borders } from 'themes/themeConstants';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

const Province = () => {
  const { control } = useFormContext<AddManuallyAddressModalProps>();
  const [t] = useTranslation();
  const provinceFieldName = 'province';
  const provinceFieldLabel = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MANUALLY_MODAL_PROVINCE);
  const { field, fieldState } = useController({
    name: provinceFieldName,
    control
  });
  const { onChange, onBlur, ...fieldProps } = field;
  const { error } = fieldState;
  const provinceHelperText = error?.message;
  const provinceErrorText = !!error?.message;
  const theme = useTheme();

  return (
    <Grid item xs={12}>
      <BaseDropdownWithLoading
        isLoading={false}
        ListboxProps={{
          style: {
            maxHeight: 260,
            borderRadius: `${borderRadius.radius8}`,
            border: `${borders.solid2px} ${theme.palette.primary.main}`
          }
        }}
        id={provinceFieldName}
        onChange={(_, value) => value && typeof value === 'object' && 'id' in value && onChange(value.title)}
        onBlur={onBlur}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        options={[{ id: '123', title: 'ON' }]} // till endpoint will be ready
        getOptionLabel={(option) => (typeof option === 'object' ? option.title : option)}
        clearIcon={<CloseIcon onClick={() => onChange('')} fontSize="small" />}
        renderInputProps={{
          ...fieldProps,
          label: provinceFieldLabel,
          name: provinceFieldName,
          helperText: provinceHelperText,
          error: provinceErrorText
        }}
      />
    </Grid>
  );
};

export default Province;
