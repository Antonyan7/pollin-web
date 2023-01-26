import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { GroupedServiceProvidersOption } from '@axios/booking/managerBookingTypes';
import { GroupedServiceProvidersPopper } from '@components/Appointments/CommonMaterialComponents';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { dispatch } from '@redux/hooks';
import { bookingMiddleware } from '@redux/slices/booking';
import { useRouter } from 'next/router';
import { borderRadius, borders } from 'themes/themeConstants';
import { IGroupedServiceProviders } from 'types/reduxTypes/bookingStateTypes';

import { useLodashThrottle } from '@hooks/useLodashThrottle';
import { usePaginatedAutoCompleteScroll } from '@hooks/usePaginatedAutoCompleteScroll';
import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

interface ResourceDropdownProps {
  groupedServiceProvidersList: IGroupedServiceProviders;
  serviceProviderId: string;
  isGroupedServiceProvidersLoading: boolean;
  specimenCollection?: boolean;
  dataCy: string;
  label: string;
}

const ResourceDropdown = ({
  groupedServiceProvidersList,
  serviceProviderId,
  isGroupedServiceProvidersLoading,
  specimenCollection = false,
  dataCy,
  label
}: ResourceDropdownProps) => {
  const theme = useTheme();
  const router = useRouter();
  const { resource } = router.query;

  const [groupedServiceProvidersSelectedOption, setGroupedServiceProvidersSelectedOption] =
    useState<GroupedServiceProvidersOption | null>(null);

  const adaptedGroupedOptions = useMemo(
    () =>
      groupedServiceProvidersList.providers.flatMap((provider) =>
        provider?.items.map((option) => ({ ...option, type: provider.groupTitle }))
      ),
    [groupedServiceProvidersList.providers]
  );

  const onServiceProviderChange = useCallback(
    (providerOption?: GroupedServiceProvidersOption) => {
      dispatch(bookingMiddleware.applyResource(providerOption?.id ?? '', specimenCollection));
    },
    [specimenCollection]
  );

  useEffect(() => {
    if (typeof resource === 'string') {
      const option = adaptedGroupedOptions.find(({ id }) => id === resource);

      if (option) {
        setGroupedServiceProvidersSelectedOption(option);
        onServiceProviderChange(option);
      }
    }
  }, [adaptedGroupedOptions, onServiceProviderChange, resource]);

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

  const throttleFn = useLodashThrottle(handleThrottleSearch);

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
        value={groupedServiceProvidersSelectedOption}
        options={adaptedGroupedOptions}
        filterOptions={(options) => options} // disable mui filtering the BE will give us filtered data
        groupBy={(option) => option.type}
        getOptionLabel={(option) => (typeof option === 'object' ? option.title : option)}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={(_event, option, reason) => {
          if (reason === 'clear') {
            onServiceProviderChange();
            setGroupedServiceProvidersSelectedOption(null);
          } else if (option) {
            setGroupedServiceProvidersSelectedOption(option as GroupedServiceProvidersOption);
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
