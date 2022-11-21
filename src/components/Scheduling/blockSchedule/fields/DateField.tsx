import React, { useCallback, useEffect, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextField, useTheme } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Translation } from 'constants/translations';

import { IFieldRowProps } from '../form/IFieldRowProps';
import { IBlockScheduleForm } from '../form/initialValues';

const DateField = ({ fieldLabel, fieldName }: IFieldRowProps) => {
  const [t] = useTranslation();

  const { control, formState, getValues, watch, clearErrors } = useFormContext<IBlockScheduleForm>();
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);

  const onDateDatePickerOpen = useCallback(() => {
    setDatePickerOpen(true);
  }, []);

  const onDateDatePickerClose = useCallback(() => {
    setDatePickerOpen(false);
  }, []);

  const { errors } = formState;
  const theme = useTheme();

  const { field } = useController<IBlockScheduleForm>({
    name: fieldName,
    control
  });
  const { onChange, value, ...fieldProps } = field;

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    switch (errors[fieldName]?.type) {
      case 'required':
        if (fieldName === 'startDate') {
          setErrorMessage(t(Translation.PAGE_SCHEDULING_BLOCK_TEMPLATES_START_DATE_ERROR));
        } else {
          setErrorMessage(t(Translation.PAGE_SCHEDULING_BLOCK_TEMPLATES_END_DATE_ERROR));
        }

        break;
      case 'max':
        setErrorMessage(t(Translation.PAGE_SCHEDULING_BLOCK_DATE_START_BEFORE_END_ERROR));
        break;
      case 'min':
        setErrorMessage(t(Translation.PAGE_SCHEDULING_BLOCK_DATE_START_AFTER_END_ERROR));
        break;

      default:
        break;
    }
  }, [clearErrors, errors.startDate, errors.endDate, fieldName, t, errors, getValues]);

  useEffect(() => {
    watch(() => {
      const getValuesStartDate = getValues().startDate;
      const getValuesStartEnd = getValues().endDate;
      const isStartDateBeforeEndDate =
        getValuesStartDate && getValuesStartEnd && getValuesStartDate <= getValuesStartEnd;

      if (isStartDateBeforeEndDate) {
        clearErrors('endDate');
        clearErrors('startDate');
        setErrorMessage('');
      }
    });
  }, [clearErrors, getValues, watch]);

  return (
    <DesktopDatePicker
      open={datePickerOpen}
      onOpen={onDateDatePickerOpen}
      onClose={onDateDatePickerClose}
      label={fieldLabel}
      inputFormat="MMM dd, yyy"
      disableMaskedInput
      disablePast
      value={value}
      onChange={(date: Date | null) => date && onChange(date)}
      renderInput={(params) => (
        <TextField
          fullWidth
          {...params}
          id={fieldName}
          onClick={() => setDatePickerOpen(true)}
          onKeyDown={(event) => {
            event.preventDefault();
          }}
          sx={{
            svg: { color: theme.palette.primary.main }
          }}
          helperText={errors[fieldName]?.message && errorMessage}
          error={Boolean(errors[fieldName])}
          {...fieldProps}
        />
      )}
    />
  );
};

export default DateField;
