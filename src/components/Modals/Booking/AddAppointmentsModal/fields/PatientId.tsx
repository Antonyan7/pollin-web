import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ICreatedAppointmentBody } from '@axios/managerBooking';
import { Autocomplete, AutocompleteInputChangeReason, Grid, TextField, TextFieldProps } from '@mui/material';
import { Translation } from 'constants/translations';
import { createOptionsGroup } from 'helpers/berryFunctions';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { validateInputChange } from 'validation/validationHelpers';

const PatientId = () => {
  const { control, formState } = useFormContext<ICreatedAppointmentBody>();
  const { errors } = formState;

  const patientsList = useAppSelector(bookingSelector.patientList);
  const { patients } = patientsList;
  const [t] = useTranslation();
  const patientOptions = useMemo(() => createOptionsGroup(patients.patients), [patients.patients]);

  const patientIdFieldName = 'patientId';
  const patientIdHelperText = errors[patientIdFieldName]?.message;
  const patientIdErrorText = !!errors[patientIdFieldName]?.message;
  const patientIdSelectLabel = t(Translation.MODAL_APPOINTMENTS_ADD_SELECT_PATIENT);
  const [patientsListCurrentPage, setPatientsListCurrentPage] = useState<number>(2);
  const [position, setPosition] = useState<number>(0);
  const [patientsListRef, setPatientListRef] = useState<{ current: HTMLDivElement | null }>({ current: null });

  const mounted = useRef<boolean>(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else if (position && patientsListRef.current) {
      patientsListRef.current.scrollTop = position - patientsListRef.current.offsetHeight;
    }
  });

  const {
    field: { onBlur, onChange, ...fieldProps }
  } = useController({ name: patientIdFieldName, control });

  const onPatientListScroll = (event: React.UIEvent) => {
    const eventTarget = event.target as HTMLDivElement;

    const isScrollBottom = eventTarget.scrollHeight - Math.round(eventTarget.scrollTop) === eventTarget.clientHeight;
    const isPageEnd = patientsList.pageSize * patientsListCurrentPage <= patientsList.totalItems;

    if (isScrollBottom) {
      if (isPageEnd) {
        setPatientsListCurrentPage(patientsListCurrentPage + 1);

        const getNewPatientsRequestObj = {
          name: '',
          page: patientsListCurrentPage
        };

        dispatch(bookingMiddleware.getNewPatients(getNewPatientsRequestObj));

        const scrollPosition = eventTarget.scrollTop + eventTarget.clientHeight;

        setPosition(scrollPosition);
        setPatientListRef({
          current: eventTarget
        });
      }
    }
  };

  return (
    <Grid item xs={12}>
      <Autocomplete
        ListboxProps={{
          style: { maxHeight: 250 },
          onScroll: onPatientListScroll
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
