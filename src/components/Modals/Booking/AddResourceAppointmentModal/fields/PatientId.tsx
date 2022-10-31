import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ICreatedAppointmentBody } from '@axios/booking/managerBookingTypes';
import { AutocompleteInputChangeReason, Grid } from '@mui/material';
import { useTheme } from '@mui/system';
import { patientsMiddleware } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { createOptionsGroup } from 'helpers/berryFunctions';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { borderRadius, borders } from 'themes/themeConstants';
import { validateInputChange } from 'validation/validationHelpers';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

const INITIAL_PAGE_NUMBER = 1;

const PatientId = () => {
  const [t] = useTranslation();
  const [openAutocompleteList, setOpenAutocompleteList] = useState(false);
  const patientIdFieldName = 'patientId';

  const patientsList = useAppSelector(bookingSelector.patientList);
  const { patients, isLoading } = patientsList;
  const patientOptions = useMemo(() => createOptionsGroup(patients), [patients]);

  const { control } = useFormContext<ICreatedAppointmentBody>();
  const { field, fieldState } = useController({ name: patientIdFieldName, control });
  const { onBlur, onChange, ...fieldProps } = field;
  const { error } = fieldState;
  const [inputValue, setInputValue] = useState(field.value);
  const patientIdHelperText = error?.message;
  const patientIdErrorText = !!error?.message;
  const patientIdSelectLabel = t(Translation.MODAL_APPOINTMENTS_ADD_SELECT_PATIENT);
  const patientsListCurrentPage = useRef(INITIAL_PAGE_NUMBER);
  const patientsListRef = useRef<HTMLDivElement | null>(null);
  const scrollPosition = useRef(0);
  const theme = useTheme();

  useEffect(() => {
    if (!isLoading && patientsListCurrentPage.current > INITIAL_PAGE_NUMBER && patientsListRef.current) {
      patientsListRef.current.scrollTop = scrollPosition.current;
    }
  }, [isLoading]);

  const onInputChange = useCallback((_: React.SyntheticEvent, newInputValue: string) => {
    setInputValue(newInputValue);

    if (newInputValue.length > 0) {
      setOpenAutocompleteList(true);

      const data = {
        searchString: newInputValue
      };

      dispatch(patientsMiddleware.getPatientsList(data));
    } else {
      setOpenAutocompleteList(false);
    }
  }, []);

  return (
    <Grid item xs={12}>
      <BaseDropdownWithLoading
        freeSolo
        inputValue={inputValue}
        isLoading={isLoading}
        ListboxProps={{
          style: {
            maxHeight: 220,
            borderRadius: `${borderRadius.radius8}`,
            border: `${borders.solid2px} ${theme.palette.primary.main}`
          }
        }}
        open={openAutocompleteList}
        onClose={() => setOpenAutocompleteList(false)}
        id={patientIdFieldName}
        options={patientOptions}
        isOptionEqualToValue={(option, value) => option.item.id === value.item.id}
        getOptionLabel={(option) => option.item.title}
        onChange={(_, value) => {
          if (value?.item.id) {
            onChange(value.item.id);
            dispatch(bookingMiddleware.getPatientAlerts(value?.item.id));
          }
        }}
        groupBy={(option) => option.firstLetter}
        onBlur={onBlur}
        onInputChange={(event: React.SyntheticEvent, value: string, reason: AutocompleteInputChangeReason) => {
          onChange(validateInputChange(event, value, reason));
          onInputChange(event, value);
        }}
        renderInputProps={{
          ...fieldProps,
          label: patientIdSelectLabel,
          name: patientIdFieldName,
          helperText: patientIdHelperText,
          error: patientIdErrorText
        }}
      />
    </Grid>
  );
};

export default PatientId;
