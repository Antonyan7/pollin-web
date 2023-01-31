import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OrdersFilterOption } from '@axios/results/resultsManagerTypes';
import { GroupedServiceProvidersPopper } from '@components/Appointments/CommonMaterialComponents';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useTheme } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { ordersMiddleware, ordersSelector } from '@redux/slices/orders';
import { Translation } from 'constants/translations';
import { borderRadius, borders } from 'themes/themeConstants';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

interface PatientOrdersResultFiltersProps {
  setFiltersChange: (args: OrdersFilterOption[]) => void;
}

interface PatientOrdersFiltersResult extends OrdersFilterOption {
  type: string;
}

const PatientOrdersFilters = ({ setFiltersChange }: PatientOrdersResultFiltersProps) => {
  const theme = useTheme();
  const [t] = useTranslation();
  const ordersFilters = useAppSelector(ordersSelector.ordersFilters);
  const isOrdersFiltersLoading = useAppSelector(ordersSelector.isOrdersFiltersLoading);
  const [selectedFilters, setSelectedFilters] = useState<PatientOrdersFiltersResult[]>([]);

  const adaptedGroupedOptions = (): PatientOrdersFiltersResult[] =>
    ordersFilters.flatMap((order) =>
      order.options.map((option: OrdersFilterOption) => ({ ...option, type: order.title }))
    );

  const onFilterUpdate = (filters: PatientOrdersFiltersResult[]) => {
    setSelectedFilters(filters);
    setFiltersChange(filters);
  };

  useEffect(() => {
    dispatch(ordersMiddleware.getOrdersFilters());
  }, []);

  return (
    <BaseDropdownWithLoading
      isLoading={isOrdersFiltersLoading}
      fullWidth
      multiple
      PopperComponent={GroupedServiceProvidersPopper}
      ListboxProps={{
        style: {
          maxHeight: 260,
          borderRadius: `${borderRadius.radius8}`,
          border: `${borders.solid2px} ${theme.palette.primary.main}`
        }
      }}
      onChange={(_event, filters) => onFilterUpdate(filters as PatientOrdersFiltersResult[])}
      getOptionDisabled={(option) => {
        if (option && selectedFilters.length > 0) {
          return !!selectedFilters?.find((selectedFilter) => selectedFilter.type === option.type);
        }

        return false;
      }}
      groupBy={(option) => option.type}
      getOptionLabel={(option) => (typeof option === 'object' ? option.title : option)}
      options={adaptedGroupedOptions()}
      renderInputProps={{
        label: t(Translation.PAGE_PATIENT_LIST_FIELD_FILTERS)
      }}
      popupIcon={<KeyboardArrowDownIcon sx={{ color: theme.palette.primary.main }} />}
    />
  );
};

export default PatientOrdersFilters;
