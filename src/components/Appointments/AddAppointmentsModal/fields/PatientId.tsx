import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ICreatedAppointmentBody } from '@axios/managerBooking';
import { Autocomplete, AutocompleteInputChangeReason, Grid, TextField, TextFieldProps } from '@mui/material';
import { Translation } from 'constants/translations';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { AlertDetailsProps } from 'types/reduxTypes/patient-emr';
import { validateInputChange } from 'validation/validationHelpers';

import DuplicatePatientPopup from '@ui-component/patient/DuplicatePatientPopup';

interface PatientIdFieldProps {
  setDisableActionButton: React.Dispatch<SetStateAction<boolean>>;
}

enum OpenModalReason {
  DuplicateName = 'Duplicate Name'
}

const PatientId = ({ setDisableActionButton }: PatientIdFieldProps) => {
  const [openDuplicateAlertPopUp, setOpenDuplicateAlertPopUp] = useState<boolean>(false);
  const { control, formState } = useFormContext<ICreatedAppointmentBody>();
  const { errors } = formState;

  const patientsList = useAppSelector(bookingSelector.patientList);
  const patientAlerts = useAppSelector(bookingSelector.patientAlerts);
  const { patients } = patientsList;
  const [t] = useTranslation();

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

  const onPatientListScroll = (event: UIEvent) => {
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

  useEffect(() => {
    if (control._formValues.patientId) {
      dispatch(bookingMiddleware.getPatientAlerts(control._formValues.patientId));
    }
  }, [control._formValues.patientId]);

  useEffect(() => {
    if (patientAlerts?.alerts && patientAlerts.alerts.length > 0) {
      const findDuplicate = patientAlerts.alerts.filter((alertDetails: AlertDetailsProps) =>
        Boolean(alertDetails.messages.find((message) => message.title === OpenModalReason.DuplicateName))
      );

      if (findDuplicate.length) {
        setOpenDuplicateAlertPopUp(true);
        dispatch(bookingMiddleware.getPatientAlerts());
      } else {
        setOpenDuplicateAlertPopUp(false);
        setDisableActionButton(false);
      }
    }
  }, [patientAlerts?.alerts, setDisableActionButton]);

  return (
    <>
      <Grid item xs={12}>
        <Autocomplete
          ListboxProps={{
            style: { maxHeight: 250 },
            onScroll: (event) => {
              onPatientListScroll(event as unknown as UIEvent);
            }
          }}
          id={patientIdFieldName}
          options={patients.patients}
          getOptionLabel={(option) => option.title}
          onChange={(_, value) => onChange(value?.id)}
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
      <DuplicatePatientPopup open={openDuplicateAlertPopUp} setOnClose={setOpenDuplicateAlertPopUp} />
    </>
  );
};

export default PatientId;
