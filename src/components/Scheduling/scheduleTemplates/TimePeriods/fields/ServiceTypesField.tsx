import React, { useMemo } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { OptionsReturnProps } from 'types/create-schedule';
import { IServiceType } from 'types/reduxTypes/booking';

import { createOptionsGroup } from '../../../../../helpers/berryFunctions';

import { TimePeriodsFieldProps } from './TimePeriodsFieldProps';

interface IServiceTypesFieldProps extends TimePeriodsFieldProps {
  serviceTypes: IServiceType[];
}

const ServiceTypesField = ({ index, updateInputValue, serviceTypes }: IServiceTypesFieldProps) => {
  const serviceTypeOptions = useMemo(() => createOptionsGroup(serviceTypes), [serviceTypes]);

  const onServiceTypesFieldChange = (_e: React.SyntheticEvent, newValues: OptionsReturnProps<IServiceType>[]) =>
    updateInputValue(
      'serviceTypes',
      newValues.map((value) => value.item.title),
      index
    );

  return (
    <Autocomplete
      className="schedule-inputs"
      multiple
      options={serviceTypeOptions}
      groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option.item.title}
      onChange={onServiceTypesFieldChange}
      renderInput={(params) => <TextField {...params} label="Service Types" />}
    />
  );
};

export default ServiceTypesField;
