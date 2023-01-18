import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { GroupedServiceProvidersOption } from '@axios/booking/managerBookingTypes';
import { GroupedServiceProvidersPopper } from '@components/Appointments/CommonMaterialComponents';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { dispatch, useAppSelector } from '@redux/hooks';
import { bookingMiddleware, bookingSelector } from '@redux/slices/booking';
import throttle from 'lodash.throttle';
import { borderRadius, borders } from 'themes/themeConstants';

import { usePaginatedAutoCompleteScroll } from '@hooks/usePaginatedAutoCompleteScroll';
import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

interface ResourceDropdownProps {
  specimenCollection?: boolean;
  dataCy: string;
  label: string;
}

const ResourceDropdown = ({ specimenCollection = false, dataCy, label }: ResourceDropdownProps) => {
  const theme = useTheme();

  const groupedServiceProvidersList = useAppSelector(bookingSelector.groupedServiceProvidersList);
  const serviceProviderId = useAppSelector(bookingSelector.serviceProviderId);
  const isGroupedServiceProvidersLoading = useAppSelector(bookingSelector.isGroupedServiceProvidersLoading);

  const [groupedServiceProvidersOptions, setGroupedServiceProvidersOptions] = useState<GroupedServiceProvidersOption>({
    id: '',
    type: '',
    title: ''
  });

  useEffect(() => {
    if (serviceProviderId) {
      setGroupedServiceProvidersOptions((prevGroupedServiceProvidersOptions) => ({
        ...prevGroupedServiceProvidersOptions,
        id: serviceProviderId
      }));
    }
  }, [serviceProviderId]);

  useEffect(() => {
    if (groupedServiceProvidersList.providers.length === 0 && groupedServiceProvidersList.currentPage === 0) {
      dispatch(
        bookingMiddleware.getGroupedServiceProviders({
          page: 1,
          ...(specimenCollection ? { specimenCollection } : {})
        })
      );
    }
  }, [specimenCollection, groupedServiceProvidersList]);

  const adaptedGroupedOptions = useMemo(
    () =>
      groupedServiceProvidersList.providers.flatMap((provider) =>
        provider?.items.map((option) => ({ ...option, type: provider.groupTitle }))
      ),
    [groupedServiceProvidersList.providers]
  );

  const onServiceProviderChange = (providerOption?: GroupedServiceProvidersOption) => {
    dispatch(bookingMiddleware.applyResource(providerOption?.id ?? ''));
  };

  const onBottomReach = useCallback(
    (currentPage: number) => {
      dispatch(
        bookingMiddleware.getNewGroupedServiceProviders({
          page: currentPage,
          ...(specimenCollection ? { specimenCollection } : {}),
          ...(groupedServiceProvidersList.searchString
            ? { searchString: groupedServiceProvidersList.searchString }
            : {})
        })
      );
    },
    [specimenCollection, groupedServiceProvidersList.searchString]
  );

  const { onScroll: onServiceProviderScroll, resetScroll } = usePaginatedAutoCompleteScroll(
    1,
    isGroupedServiceProvidersLoading,
    groupedServiceProvidersList.pageSize,
    groupedServiceProvidersList.totalItems,
    onBottomReach
  );

  const handleThrottleSearch = useCallback(
    (searchString: string) => {
      dispatch(
        bookingMiddleware.getGroupedServiceProviders({
          page: 1,
          ...(specimenCollection ? { specimenCollection } : {}),
          searchString
        })
      );
    },
    [specimenCollection]
  );

  const throttleFn = useMemo(
    () =>
      throttle(handleThrottleSearch, 1000, {
        leading: false,
        trailing: true
      }),
    [handleThrottleSearch]
  );

  useEffect(
    () => () => {
      throttleFn.cancel();
    },
    [throttleFn]
  );

  useEffect(() => {
    resetScroll();
  }, [groupedServiceProvidersList.searchString, resetScroll]);

  return (
    <Box sx={{ minWidth: '225px' }}>
      <BaseDropdownWithLoading
        freeSolo
        isLoading={isGroupedServiceProvidersLoading}
        data-cy={dataCy}
        PopperComponent={GroupedServiceProvidersPopper}
        popupIcon={<KeyboardArrowDownIcon color="primary" />}
        forcePopupIcon
        ListboxProps={{
          style: {
            border: `${borders.solid2px} ${theme.palette.primary.main}`,
            borderRadius: borderRadius.radius12
          },
          onScroll: (event) => onServiceProviderScroll(event)
        }}
        options={adaptedGroupedOptions}
        filterOptions={(options) => options} // disable mui filtering the BE will give us filtered data
        groupBy={(option) => option.type}
        getOptionLabel={(option) => (typeof option === 'object' ? option.title : option)}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={(_event, option, reason) => {
          if (reason === 'clear') {
            onServiceProviderChange();
            setGroupedServiceProvidersOptions({ ...groupedServiceProvidersOptions, id: '' });
          } else if (option) {
            onServiceProviderChange(option as GroupedServiceProvidersOption);
          }
        }}
        onInputChange={(_event, searchString, reason) => {
          if (reason === 'input' || reason === 'clear') {
            throttleFn(searchString);
          }
        }}
        clearIcon={<CloseIcon fontSize="small" />}
        renderInputProps={{
          label,
          value: serviceProviderId
        }}
      />
    </Box>
  );
};

export default ResourceDropdown;
