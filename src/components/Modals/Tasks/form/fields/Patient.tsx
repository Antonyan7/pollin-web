import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/system';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { createOptionsGroupPatients } from 'helpers/berryFunctions';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware } from 'redux/slices/booking';
import { borderRadius, borders } from 'themes/themeConstants';
import { IPatientOption } from 'types/reduxTypes/bookingStateTypes';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

const INITIAL_PAGE = 1;

const PatientField = ({ label }: { label?: string }) => {
  const [t] = useTranslation();
  const [openAutocompleteList, setOpenAutocompleteList] = useState(false);
  const patientIdFieldName = 'patient';

  const patientsList = useAppSelector(patientsSelector.patientsList);
  const { patients } = patientsList;
  const isLoading = useAppSelector(patientsSelector.isPatientsListLoading);
  const patientOptions = useMemo(() => createOptionsGroupPatients(patients), [patients]);

  const { control } = useFormContext();
  const { field, fieldState } = useController({ name: patientIdFieldName, control });
  const { onBlur, onChange, ...fieldProps } = field;
  const { error } = fieldState;
  const [inputValue, setInputValue] = useState(field.value);
  const patientIdHelperText = error?.message;
  const patientIdErrorText = !!error?.message;
  const patientIdSelectLabel = label ?? (t(Translation.PAGE_TASKS_MANAGER_MODAL_CREATE_PATIENT_PLACEHOLDER) as string);
  const patientsListCurrentPage = useRef(INITIAL_PAGE);
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
    if (!isLoading && patientsListCurrentPage.current > INITIAL_PAGE && patientsListRef.current) {
      patientsListRef.current.scrollTop = scrollPosition.current;
    }
  }, [isLoading]);

  const onInputChange = useCallback((_: React.SyntheticEvent, value: string) => {
    setInputValue(value);

    if (value.length > 0) {
      setOpenAutocompleteList(true);
      dispatch(patientsMiddleware.cleanPatientList());

      const data = {
        searchString: value
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
        onBlur={onBlur}
        clearIcon={
          <CloseIcon
            onClick={() => {
              onChange('');
              dispatch(patientsMiddleware.emptyPatientProfile());
            }}
            fontSize="small"
          />
        }
        onInputChange={(event: React.SyntheticEvent, value: string) => {
          if (event) {
            onInputChange(event, value);
          }
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

export default PatientField;
