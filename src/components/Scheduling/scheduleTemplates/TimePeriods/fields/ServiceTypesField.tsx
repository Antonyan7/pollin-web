import React, { useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { schedulingSelector } from '@redux/slices/scheduling';
import { createOptionsGroup } from 'helpers/berryFunctions';
import { ITemplateGroup, OptionsReturnProps } from 'types/create-schedule';
import { IServiceType } from 'types/reduxTypes/booking';

const ServiceTypesField: React.FC<{ index: number }> = ({ index }) => {
  const serviceTypes: IServiceType[] = useAppSelector(schedulingSelector.serviceTypes);
  const serviceTypeOptions = useMemo(() => createOptionsGroup(serviceTypes), [serviceTypes]);
  const { control } = useFormContext<ITemplateGroup>();
  const {
    field: { onChange, value: fieldValue, ...fieldProps }
  } = useController({ name: `timePeriods.${index}.serviceTypes`, control });

  const onServiceTypesFieldChange = (_e: React.SyntheticEvent, newValues: OptionsReturnProps<IServiceType>[]) =>
    onChange(newValues.map((newValue) => newValue.item.id));

  return (
    <Autocomplete
      className="schedule-inputs"
      multiple
      options={serviceTypeOptions}
      groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option.item.title}
      isOptionEqualToValue={(option, value) => option.item.title === value.item.title}
      onChange={onServiceTypesFieldChange}
      renderInput={(params) => <TextField {...params} label="Service Types" {...fieldProps} />}
    />
  );
};

export default ServiceTypesField;
