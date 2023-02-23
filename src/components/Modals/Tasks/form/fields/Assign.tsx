import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/system';
import { staffMiddleware, staffSelector } from '@redux/slices/staff';
import { Translation } from 'constants/translations';
import { createOptionsGroupPatients } from 'helpers/berryFunctions';
import { dispatch, useAppSelector } from 'redux/hooks';
import { borderRadius, borders } from 'themes/themeConstants';
import { IPatientOption } from 'types/reduxTypes/bookingStateTypes';

import { usePaginatedAutoCompleteScroll } from '@hooks/usePaginatedAutoCompleteScroll';
import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

const INITIAL_PAGE = 1;

const AssignField = ({ fieldLabel }: { fieldLabel?: string }) => {
  const [t] = useTranslation();
  const labelFieldName = 'assign';

  const staffUsers = useAppSelector(staffSelector.staffUsers);
  const isStaffLoading = useAppSelector(staffSelector.isStaffLoading);

  const { staff } = staffUsers;
  const staffOptions = useMemo(() => createOptionsGroupPatients(staff), [staff]);

  const { control, register } = useFormContext();
  const { field, fieldState } = useController({ name: labelFieldName, control });
  const { onBlur, onChange, ...fieldProps } = field;
  const { error } = fieldState;
  const [inputValue, setInputValue] = useState(field.value);
  const labelHelperText = error?.message;
  const labelErrorText = !!error?.message;
  const assignLabel = fieldLabel ?? t(Translation.PAGE_TASKS_MANAGER_MODAL_CREATE_PATIENT_ASSIGN_PLACEHOLDER);
  const theme = useTheme();

  const onBottomReach = useCallback(
    (currentPage: number) => {
      const maxPageCount = Math.floor(staffUsers.totalItems / staffUsers.pageSize);

      if (currentPage <= maxPageCount) {
        dispatch(
          staffMiddleware.getNewStaffUsers({
            page: currentPage,
            ...(inputValue ? { searchString: inputValue } : {})
          })
        );
      }
    },
    [inputValue, staffUsers]
  );

  const onInputChange = useCallback((_: React.SyntheticEvent, value: string) => {
    setInputValue(value);
  }, []);

  const { onScroll: onStaffScroll } = usePaginatedAutoCompleteScroll(
    1,
    Math.max(staffUsers.currentPage, 1),
    isStaffLoading,
    staffUsers.pageSize,
    staffUsers.totalItems,
    onBottomReach
  );

  const getOptionLabel = useCallback((option: IPatientOption | string) => {
    if (typeof option === 'object') {
      return option.item.name;
    }

    return option;
  }, []);

  useEffect(() => {
    const data = { page: INITIAL_PAGE, ...(inputValue ? { searchString: inputValue } : {}) };

    dispatch(staffMiddleware.getStaffUsers(data));
  }, [inputValue]);

  return (
    <Grid item xs={12}>
      <BaseDropdownWithLoading
        inputValue={inputValue}
        {...register(`${labelFieldName}`)}
        isLoading={isStaffLoading}
        ListboxProps={{
          style: {
            maxHeight: 220,
            borderRadius: `${borderRadius.radius8}`,
            border: `${borders.solid2px} ${theme.palette.primary.main}`
          },
          onScroll: (event) => onStaffScroll(event)
        }}
        id={labelFieldName}
        options={staffOptions}
        isOptionEqualToValue={(option, value) => option.item.id === value.item.id}
        getOptionLabel={(option) => getOptionLabel(option)}
        onChange={(_, value) => {
          if (value && typeof value === 'object' && 'item' in value) {
            onChange(value.item.id);
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

export default AssignField;
