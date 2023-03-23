import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ICreateAppointmentBody } from '@axios/booking/managerBookingTypes';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/system';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { createOptionsGroupPatients } from 'helpers/berryFunctions';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware } from 'redux/slices/booking';
import { borderRadius, borders } from 'themes/themeConstants';
import { IPatientOption } from 'types/reduxTypes/bookingStateTypes';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

const INITIAL_PAGE_NUMBER = 1;

const PatientId = () => {
  const [t] = useTranslation();
  const [openAutocompleteList, setOpenAutocompleteList] = useState(false);
  const patientIdFieldName = 'patientId';

  const patientsList = useAppSelector(patientsSelector.patientsList);
  const { patients } = patientsList;
  const isLoading = useAppSelector(patientsSelector.isPatientsListLoading);
  const patientOptions = useMemo(() => createOptionsGroupPatients(patients), [patients]);

  const { control } = useFormContext<ICreateAppointmentBody>();
  const { field, fieldState } = useController({ name: patientIdFieldName, control });
  const { onBlur, onChange, ...fieldProps } = field;
  const { error } = fieldState;
  const [inputValue, setInputValue] = useState(field.value);
  const patientIdHelperText = error?.message;
  const patientIdErrorText = !!error?.message;
  const patientIdSelectLabel = t(Translation.MODAL_APPOINTMENTS_ADD_SELECT_PATIENT);
  const patientIdSelectCyId = CypressIds.MODAL_APPOINTMENTS_ADD_SELECT_PATIENT;
  const patientsListCurrentPage = useRef(INITIAL_PAGE_NUMBER);
  const patientsListRef = useRef<HTMLDivElement | null>(null);
  const scrollPosition = useRef(0);
  const theme = useTheme();

  const getOptionLabel = useCallback((option: IPatientOption | string) => {
    if (typeof option === 'object') {
      return `${option.item.name} (DOB: ${option.item.dateOfBirth})`;
    }

    return option;
  }, []);

  useEffect(() => {
    if (!isLoading && patientsListCurrentPage.current > INITIAL_PAGE_NUMBER && patientsListRef.current) {
      patientsListRef.current.scrollTop = scrollPosition.current;
    }
  }, [isLoading]);

  const onInputChange = useCallback((_: React.SyntheticEvent, newInputValue: string) => {
    setInputValue(newInputValue);

    if (newInputValue.length > 0) {
      setOpenAutocompleteList(true);
      // ? Clean old data from redux for new value (After new search value.
      // ? Clean up helps us to avoid duplicated data items which stuck in redux state)
      dispatch(patientsMiddleware.cleanPatientList());

      const data = {
        searchString: newInputValue
      };

      dispatch(patientsMiddleware.getPatientsList(data));
    } else {
      // ? Clean old data from redux after closing autocomplete list
      dispatch(patientsMiddleware.cleanPatientList());
      setOpenAutocompleteList(false);
    }
  }, []);

  return (
    <Grid item xs={12}>
      <BaseDropdownWithLoading
        data-cy={patientIdSelectCyId}
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
        getOptionLabel={(option) => getOptionLabel(option)}
        onChange={(_, value) => {
          if (value && typeof value === 'object' && 'item' in value) {
            onChange(value.item.id);
            dispatch(bookingMiddleware.getPatientAlerts(value.item.id));
          }
        }}
        groupBy={(option) => option.firstLetter}
        onBlur={onBlur}
        clearIcon={<CloseIcon onClick={() => onChange('')} fontSize="small" />}
        onInputChange={(event: React.SyntheticEvent, value: string) => {
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
