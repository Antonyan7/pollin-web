import React, { useEffect, useMemo, useRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ICreatedAppointmentBody } from '@axios/booking/managerBooking';
import { Autocomplete, AutocompleteInputChangeReason, Grid, TextField, TextFieldProps } from '@mui/material';
import { useTheme } from '@mui/system';
import { Translation } from 'constants/translations';
import { createOptionsGroup } from 'helpers/berryFunctions';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { borderRadius, borders } from 'themes/themeConstants';
import { validateInputChange } from 'validation/validationHelpers';

const INITIAL_PAGE_NUMBER = 1;

const PatientId = () => {
  const [t] = useTranslation();
  const patientIdFieldName = 'patientId';

  const patientsList = useAppSelector(bookingSelector.patientList);
  const { patients, isLoading } = patientsList;
  const patientOptions = useMemo(() => createOptionsGroup(patients.patients), [patients.patients]);

  const { control } = useFormContext<ICreatedAppointmentBody>();
  const { field, fieldState } = useController({ name: patientIdFieldName, control });
  const { onBlur, onChange, ...fieldProps } = field;
  const { error } = fieldState;

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

  const onPatientListScroll = (event: React.UIEvent) => {
    const eventTarget = event.target as HTMLDivElement;

    const isScrollBottom = eventTarget.scrollHeight - Math.round(eventTarget.scrollTop) === eventTarget.clientHeight;
    const isLastPage = patientsList.pageSize * patientsListCurrentPage.current >= patientsList.totalItems;

    if (isScrollBottom) {
      if (!isLastPage) {
        scrollPosition.current = eventTarget.scrollTop;
        patientsListCurrentPage.current = 1 + patientsListCurrentPage.current;

        const getNewPatientsRequestObj = {
          name: '',
          page: patientsListCurrentPage.current
        };

        dispatch(bookingMiddleware.getNewPatients(getNewPatientsRequestObj));

        patientsListRef.current = eventTarget;
      }
    }
  };

  return (
    <Grid item xs={12}>
      <Autocomplete
        ListboxProps={{
          style: {
            maxHeight: 220,
            borderRadius: `${borderRadius.radius8}`,
            border: `${borders.solid2px} ${theme.palette.primary.main}`
          },
          onScroll: (event) => {
            onPatientListScroll(event);
          }
        }}
        id={patientIdFieldName}
        options={patientOptions}
        isOptionEqualToValue={(option, value) => option.item.id === value.item.id}
        getOptionLabel={(option) => option.item.title}
        onChange={(_, value) => onChange(value?.item.id)}
        groupBy={(option) => option.firstLetter}
        onBlur={onBlur}
        onInputChange={(event: React.SyntheticEvent, value: string, reason: AutocompleteInputChangeReason) =>
          onChange(validateInputChange(event, value, reason))
        }
        renderInput={(params: TextFieldProps) => (
          <TextField
            {...fieldProps}
            {...params}
            label={patientIdSelectLabel}
            name={patientIdFieldName}
            helperText={patientIdHelperText}
            error={patientIdErrorText}
          />
        )}
      />
    </Grid>
  );
};

export default PatientId;
