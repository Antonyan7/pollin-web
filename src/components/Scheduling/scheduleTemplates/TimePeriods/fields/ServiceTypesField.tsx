import React, { useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { useAppSelector } from '@redux/hooks';
import { schedulingSelector } from '@redux/slices/scheduling';
import { Translation } from 'constants/translations';
import { createOptionsGroup } from 'helpers/berryFunctions';
import { ITemplateGroup } from 'types/create-schedule';
import { IServiceType } from 'types/reduxTypes/bookingStateTypes';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

const ServiceTypesField: React.FC<{ index: number }> = ({ index }) => {
  const [t] = useTranslation();

  const serviceTypes: IServiceType[] = useAppSelector(schedulingSelector.serviceTypes);
  const isServiceTypesLoading = useSelector(schedulingSelector.isServiceTypesLoading);
  const serviceTypeOptions = useMemo(() => createOptionsGroup(serviceTypes), [serviceTypes]);
  const { control } = useFormContext<ITemplateGroup>();
  const { field, fieldState } = useController({ name: `timePeriods.${index}.serviceTypes`, control });
  const { onChange, value: selectedServiceTypeIds, ...fieldProps } = field;

  const selectedTypeOptions = useMemo(
    () => serviceTypeOptions.filter(({ item }) => (selectedServiceTypeIds ?? []).includes(item.id)),
    [selectedServiceTypeIds, serviceTypeOptions]
  );

  const { error: serviceTypesError } = fieldState;
  const errorMessage = t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_SERVICE_TYPES_ERROR);

  return (
    <BaseDropdownWithLoading
      isLoading={isServiceTypesLoading}
      className="schedule-inputs"
      multiple
      options={serviceTypeOptions}
      groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => (typeof option === 'object' ? option.item.title : option)}
      isOptionEqualToValue={(option, value) => option.item.title === value.item.title}
      value={[...selectedTypeOptions]}
      color="primary"
      onChange={(_, newValues) => {
        onChange(newValues.map((newValue) => (typeof newValue === 'object' ? newValue.item.id : newValue)));
      }}
      clearIcon={<CloseIcon onClick={() => onChange('')} fontSize="small" />}
      renderInputProps={{
        sx: {
          svg: { color: (theme) => theme.palette.primary.main }
        },
        helperText: serviceTypesError?.message && errorMessage,
        error: !!serviceTypesError,
        label: 'Service Types',
        ...fieldProps
      }}
    />
  );
};

export default ServiceTypesField;
