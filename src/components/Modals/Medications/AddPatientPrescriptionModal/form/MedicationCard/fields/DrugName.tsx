import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/system';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { createOptionsGroupPatients } from 'helpers/berryFunctions';
import { dispatch, useAppSelector } from 'redux/hooks';
import { borderRadius, borders } from 'themes/themeConstants';
import { IPatientOption } from 'types/reduxTypes/bookingStateTypes';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

const INITIAL_PAGE = 1;

interface DrugNameFieldOptions {
  id: string;
  name: string;
}

const DrugNameField = ({ index }: { index: number }) => {
  const [t] = useTranslation();
  const drugs = useAppSelector(patientsSelector.drugs);
  const isDrugLoading = useAppSelector(patientsSelector.isDrugLoading);
  const prescriptionsDrugList = useAppSelector(patientsSelector.prescriptionsDrugList);
  const labelFieldName = `medications.${index}.drugId`;
  const options = useMemo(() => drugs?.map((drug) => ({ id: drug.id, name: drug.title })), [drugs]);
  const drugOptions = useMemo(() => createOptionsGroupPatients(options ?? []), [options]);
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name: labelFieldName, control });
  const { onBlur, onChange, ...fieldProps } = field;
  const { error } = fieldState;
  const [inputValue, setInputValue] = useState('');
  const labelHelperText = error?.message;
  const labelErrorText = !!error?.message;
  const assignLabel = t(Translation.MODAL_PRESCRIPTIONS_DRUG_NAME);
  const theme = useTheme();

  const onInputChange = useCallback((_: React.SyntheticEvent, value: string) => {
    setInputValue(value);
  }, []);

  const getOptionLabel = useCallback((option: IPatientOption | string) => {
    if (typeof option === 'object') {
      return option.item.name;
    }

    return option;
  }, []);

  useEffect(() => {
    dispatch(patientsMiddleware.getDrugs(inputValue, INITIAL_PAGE));
  }, [inputValue]);

  const onDrugNameChange = (drugNameItem: DrugNameFieldOptions) => {
    onChange(drugNameItem.id);

    if (prescriptionsDrugList && prescriptionsDrugList.length) {
      const prescriptionsDrugListItems = prescriptionsDrugList.map((prescriptionsDrugListItem) =>
        prescriptionsDrugListItem.id !== index ? prescriptionsDrugListItem : { id: index, name: drugNameItem.name }
      );
      const currentDrug = prescriptionsDrugList.find((elem) => elem.id === index);

      if (currentDrug) {
        dispatch(patientsMiddleware.setPatientPrescriptionsItems(prescriptionsDrugListItems));
      } else {
        dispatch(
          patientsMiddleware.setPatientPrescriptionsItems([
            ...prescriptionsDrugListItems,
            { id: index, name: drugNameItem.name }
          ])
        );
      }
    } else {
      dispatch(patientsMiddleware.setPatientPrescriptionsItems([{ id: index, name: drugNameItem.name }]));
    }
  };

  return (
    <Grid item xs={12}>
      <BaseDropdownWithLoading
        inputValue={inputValue}
        isLoading={isDrugLoading}
        ListboxProps={{
          style: {
            maxHeight: 220,
            borderRadius: `${borderRadius.radius8}`,
            border: `${borders.solid2px} ${theme.palette.primary.main}`
          }
        }}
        id={labelFieldName}
        options={drugOptions}
        isOptionEqualToValue={(option, value) => option.item.id === value.item.id}
        getOptionLabel={(option) => getOptionLabel(option)}
        onChange={(_, value) => {
          if (value && typeof value === 'object' && 'item' in value) {
            onDrugNameChange(value.item);
          }
        }}
        onBlur={onBlur}
        clearIcon={<CloseIcon onClick={() => onChange('')} fontSize="small" />}
        onInputChange={(event: React.SyntheticEvent, value: string) => {
          onInputChange(event, value);
        }}
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

export default DrugNameField;
