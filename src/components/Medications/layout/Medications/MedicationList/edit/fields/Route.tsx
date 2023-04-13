import React, { useEffect, useMemo, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { DropdownOptionType, IDropdownOption } from '@axios/patientEmr/managerPatientEmrTypes';
import { getDropdownByType } from '@components/MedicalBackground/helpers';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/system';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { useAppSelector } from 'redux/hooks';
import { borderRadius, borders } from 'themes/themeConstants';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

import { AddPatientMedicationFormField } from '../initialValues';

const RouteField = ({ fieldLabel }: { fieldLabel?: string }) => {
  const [t] = useTranslation();
  const labelFieldName = AddPatientMedicationFormField.Route;
  const dropdownOptions = useAppSelector(patientsSelector.dropdownOptions);
  const isDropdownOptionsLoading = useAppSelector(patientsSelector.isDropdownOptionsLoading);

  const [routeDropdownOptions, setRouteDropdownOptions] = useState<IDropdownOption[]>();

  const { control } = useFormContext();
  const { field, fieldState } = useController({ name: labelFieldName, control });
  const { onBlur, onChange, ...fieldProps } = field;
  const { error } = fieldState;
  const labelHelperText = error?.message;
  const labelErrorText = !!error?.message;
  const assignLabel = fieldLabel ?? t(Translation.MODAL_ADD_PATIENT_MEDICATION_ROUTE);
  const theme = useTheme();

  const dropdownValue = useMemo(
    () =>
      dropdownOptions?.length
        ? dropdownOptions.find((option) => option.id === fieldProps.value) ?? fieldProps.value
        : null,
    [fieldProps.value, dropdownOptions]
  );

  useEffect(() => {
    if (dropdownOptions?.length) {
      const routeOptions = getDropdownByType(dropdownOptions, DropdownOptionType.Route)?.options;

      if (routeOptions) {
        setRouteDropdownOptions(routeOptions);
      }
    }
  }, [dropdownOptions]);

  return (
    <Grid item xs={12}>
      <BaseDropdownWithLoading
        isLoading={isDropdownOptionsLoading}
        ListboxProps={{
          style: {
            maxHeight: 220,
            borderRadius: `${borderRadius.radius8}`,
            border: `${borders.solid2px} ${theme.palette.primary.main}`
          }
        }}
        id={labelFieldName}
        options={(routeDropdownOptions as IDropdownOption[]) ?? []}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => (typeof option === 'object' ? option.title : option)}
        onChange={(_, value) => {
          if (value && typeof value === 'object' && 'id' in value) {
            onChange(value.id);
          }
        }}
        onBlur={onBlur}
        clearIcon={<CloseIcon onClick={() => onChange('')} fontSize="small" />}
        value={dropdownValue}
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

export default RouteField;
