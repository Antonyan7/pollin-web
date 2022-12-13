import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// import { GroupedServiceProvidersOption } from '@axios/booking/managerBookingTypes';
// import { GroupedServiceProvidersPopper } from '@components/Appointments/CommonMaterialComponents';
// import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { dispatch, useAppSelector } from '@redux/hooks';
import { bookingMiddleware, bookingSelector } from '@redux/slices/booking';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { borderRadius, borders } from 'themes/themeConstants';

import { usePaginatedAutoCompleteScroll } from '@hooks/usePaginatedAutoCompleteScroll';
import { BaseSelectWithLoading } from '@ui-component/BaseDropdownWithLoading';

const ResourceDropdown = () => {
  const theme = useTheme();
  const [t] = useTranslation();

  const serviceProviders = useAppSelector(bookingSelector.serviceProvidersList);
  // const groupedServiceProvidersList = useAppSelector(bookingSelector.groupedServiceProvidersList);
  const serviceProviderId = useAppSelector(bookingSelector.serviceProviderId);
  const isServiceProvidersLoading = useAppSelector(bookingSelector.isServiceProvidersLoading);
  // const isGroupedServiceProvidersLoading = useAppSelector(bookingSelector.isGroupedServiceProvidersLoading);
  //
  // const [groupedServiceProvidersOptions, setGroupedServiceProvidersOptions] = useState<GroupedServiceProvidersOption>({
  //   id: '',
  //   type: '',
  //   title: ''
  // });

  useEffect(() => {
    if (serviceProviders.providers.length === 0 && serviceProviders.currentPage === 0) {
      dispatch(bookingMiddleware.getServiceProviders(1));
    }
  }, [serviceProviders]);

  // useEffect(() => {
  //   if (serviceProviderId) {
  //     setGroupedServiceProvidersOptions((prevGroupedServiceProvidersOptions) => ({
  //       ...prevGroupedServiceProvidersOptions,
  //       id: serviceProviderId
  //     }));
  //   }
  // }, [serviceProviderId]);
  //
  // useEffect(() => {
  //   if (groupedServiceProvidersList.providers.length === 0 && groupedServiceProvidersList.currentPage === 0) {
  //     dispatch(bookingMiddleware.getGroupedServiceProviders({ page: 1 }));
  //   }
  // }, [groupedServiceProvidersList]);

  const onServiceProviderChange = (providerOptionId: string) => {
    dispatch(bookingMiddleware.applyResource(providerOptionId));
  };

  // const onServiceProviderChange = (providerOption?: GroupedServiceProvidersOption) => {
  //   dispatch(bookingMiddleware.applyResource(providerOption?.id ?? ''));
  // };

  const onServiceProviderScroll = usePaginatedAutoCompleteScroll(
    1,
    isServiceProvidersLoading,
    serviceProviders.pageSize,
    serviceProviders.totalItems,
    (currentPage) => {
      dispatch(bookingMiddleware.getNewServiceProviders(currentPage));
    }
  );

  // const onServiceProviderScroll = usePaginatedAutoCompleteScroll(
  //   1,
  //   isGroupedServiceProvidersLoading,
  //   groupedServiceProvidersList.pageSize,
  //   groupedServiceProvidersList.totalItems,
  //   (currentPage) => {
  //     dispatch(bookingMiddleware.getNewGroupedServiceProviders({ page: currentPage }));
  //   }
  // );

  return (
    <Box sx={{ minWidth: '225px' }}>
      <BaseSelectWithLoading
        isLoading={isServiceProvidersLoading}
        data-cy={CypressIds.PAGE_SPECIMEN_COLLECTION_SELECT_RESOURCE}
        MenuProps={{
          style: { maxHeight: 260 },
          PaperProps: {
            style: {
              border: `${borders.solid2px} ${theme.palette.primary.main}`,
              borderRadius: borderRadius.radius12
            },
            onScroll: (event) => onServiceProviderScroll(event)
          }
        }}
        IconComponent={KeyboardArrowDownIcon}
        label={t(Translation.PAGE_APPOINTMENTS_SELECT_RESOURCE)}
        onChange={(event) => {
          onServiceProviderChange(event.target.value);
        }}
        value={serviceProviderId}
      >
        {serviceProviders.providers.map((serviceProvider) => (
          <MenuItem key={`resource-${serviceProvider.id}`} value={serviceProvider.id}>
            {serviceProvider.title}
          </MenuItem>
        ))}
      </BaseSelectWithLoading>
      {/*
      <BaseDropdownWithLoading
        isLoading={isGroupedServiceProvidersLoading}
        data-cy={CypressIds.PAGE_SPECIMEN_COLLECTION_SELECT_RESOURCE}
        PopperComponent={GroupedServiceProvidersPopper}
        popupIcon={<KeyboardArrowDownIcon color="primary" />}
        ListboxProps={{
          style: {
            border: `${borders.solid2px} ${theme.palette.primary.main}`,
            borderRadius: borderRadius.radius12
          },
          onScroll: (event) => onServiceProviderScroll(event)
        }}
        options={adaptedGroupedOptions()}
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
        clearIcon={<CloseIcon fontSize="small" />}
        renderInputProps={{
          label: t(Translation.PAGE_SPECIMEN_COLLECTION_SELECT_RESOURCE),
          value: serviceProviderId
        }}
      />
      */}
    </Box>
  );
};

export default ResourceDropdown;
