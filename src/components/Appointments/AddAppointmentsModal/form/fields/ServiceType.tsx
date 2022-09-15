import React from 'react';
import { useTranslation } from 'react-i18next';
import { Autocomplete, Grid, TextField, TextFieldProps } from '@mui/material';
import { Translation } from 'constants/translations';
import { FormikValues, useFormikContext } from 'formik';
import { createOptionsGroup } from 'helpers/berryFunctions';
import { useAppSelector } from 'redux/hooks';
import { bookingSelector } from 'redux/slices/booking';
import { validateInputChange } from 'validation/validationHelpers';

const ServiceType = () => {
  const { handleBlur, setFieldValue, touched, errors }: FormikValues = useFormikContext();
  const serviceTypes = useAppSelector(bookingSelector.serviceTypes);
  const serviceTypeOptions = createOptionsGroup(serviceTypes);
  const [t] = useTranslation();

  const serviceTypeIdFieldName = 'serviceTypeId';
  const serviceTypeIdHelperText = touched[serviceTypeIdFieldName] ? errors[serviceTypeIdFieldName] : '';
  const isServiceTypeError = !!errors[serviceTypeIdFieldName] && touched[serviceTypeIdFieldName];
  const serviceTypeSelectLabel = t(Translation.MODAL_APPOINTMENTS_ADD_SELECT_SERVICE_TYPE);

  return (
    <Grid item xs={12}>
      <Autocomplete
        id={serviceTypeIdFieldName}
        onChange={(_, value) => setFieldValue(serviceTypeIdFieldName, value?.item.id)}
        onBlur={() => handleBlur(serviceTypeIdFieldName)}
        isOptionEqualToValue={(option, value) => option.item.id === value.item.id}
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
            helperText={serviceTypeIdHelperText}
            error={isServiceTypeError}
            required
          />
        )}
      />
    </Grid>
  );
};

export default ServiceType;
