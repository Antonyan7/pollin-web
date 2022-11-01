import React, { useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useAppSelector } from '@redux/hooks';
import { schedulingSelector } from '@redux/slices/scheduling';
import { createOptionsGroup } from 'helpers/berryFunctions';
import { ITemplateGroup, OptionsReturnProps } from 'types/create-schedule';
import { IServiceType } from 'types/reduxTypes/bookingStateTypes';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

const ServiceTypesField: React.FC<{ index: number }> = ({ index }) => {
  const serviceTypes: IServiceType[] = useAppSelector(schedulingSelector.serviceTypes);
  const isServiceTypesLoading = useSelector(schedulingSelector.isServiceTypesLoading);
  const serviceTypeOptions = useMemo(() => createOptionsGroup(serviceTypes), [serviceTypes]);
  const { control, getValues } = useFormContext<ITemplateGroup>();
  const { field } = useController({ name: `timePeriods.${index}.serviceTypes`, control });
  const { onChange, value: selectedServiceTypeIds, ...fieldProps } = field;
  const onServiceTypesFieldChange = (_e: React.SyntheticEvent, newValues: OptionsReturnProps<IServiceType>[]) =>
    onChange(newValues.map((newValue) => newValue.item.id));

  const values = getValues().timePeriods[index]?.serviceTypes;

  const selectedTypeOptions = useMemo(
    () => serviceTypeOptions.filter(({ item }) => (values ?? []).includes(item.id)),
    [values, serviceTypeOptions]
  );

  return (
    <BaseDropdownWithLoading
      isLoading={isServiceTypesLoading}
      className="schedule-inputs"
      multiple
      options={serviceTypeOptions}
      groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option.item.title}
      isOptionEqualToValue={(option, value) => option.item.title === value.item.title}
      value={selectedTypeOptions}
      color="primary"
      onChange={onServiceTypesFieldChange}
      renderInputProps={{
        sx: {
          svg: { color: (theme) => theme.palette.primary.main }
        },
        label: 'Service Types',
        ...fieldProps
      }}
    />
  );
};

export default ServiceTypesField;
