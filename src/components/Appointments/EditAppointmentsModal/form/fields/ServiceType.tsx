import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Autocomplete, Grid, TextField, TextFieldProps } from '@mui/material';
import { Translation } from 'constants/translations';
import { FormikValues, useFormikContext } from 'formik';
import { createOptionsGroup } from 'helpers/berryFunctions';
import { useAppSelector } from 'redux/hooks';
import { bookingSelector } from 'redux/slices/booking';
import { validateInputChange } from 'validation/validationHelpers';

const ServiceType = () => {
  const { handleBlur, setFieldValue, touched, errors, values }: FormikValues = useFormikContext();
  const serviceTypes = useAppSelector(bookingSelector.serviceTypes);
  const serviceTypeOptions = createOptionsGroup(serviceTypes);
  const [t] = useTranslation();

  const serviceTypeIdFieldName = 'serviceType';
  const serviceTypeIdHelperText = touched[serviceTypeIdFieldName] ? errors[serviceTypeIdFieldName] : '';
  const isServiceTypeError = !!errors[serviceTypeIdFieldName] && touched[serviceTypeIdFieldName];
  const serviceTypeSelectLabel = t(Translation.MODAL_APPOINTMENTS_EDIT_SELECT_SERVICE_TYPE);

  const defaultServiceTypeOption = useMemo(
    () => serviceTypeOptions.find((option) => option.item.id === values?.serviceType) ?? null,
    [values, serviceTypeOptions]
  );

  return (
    <Grid item xs={12}>
      <Autocomplete
        id="serviceType"
        onChange={(_, value) => {
          setFieldValue(serviceTypeIdFieldName, value?.item.id);
        }}
        defaultValue={defaultServiceTypeOption}
        onBlur={handleBlur(serviceTypeIdFieldName)}
        isOptionEqualToValue={(option, value) => option.item.id === value?.item.id}
        options={serviceTypeOptions}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.item.title}
        onInputChange={(event, value, reason) =>
          setFieldValue(serviceTypeIdFieldName, validateInputChange(event, value, reason))
        }
        renderInput={(params: TextFieldProps) => (
          <TextField
            {...params}
            label={serviceTypeSelectLabel}
            name={serviceTypeIdFieldName}
            required
            helperText={serviceTypeIdHelperText}
            error={isServiceTypeError}
          />
        )}
      />
    </Grid>
  );
};

export default ServiceType;
