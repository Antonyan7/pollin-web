import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GroupedServiceProvidersOption } from '@axios/booking/managerBookingTypes';
import { GroupedServiceProvidersPopper } from '@components/common/MaterialComponents';
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
  isLoading: boolean;
  isSpecimenCollection?: boolean;
  onChange: (value?: GroupedServiceProvidersOption) => void;
  dataCy: string;
  label: string;
}

const ResourceDropdown = ({
  groupedServiceProvidersList,
  serviceProviderId,
  isSpecimenCollection,
  isLoading,
  onChange,
  dataCy,
  label
}: ResourceDropdownProps) => {
  const theme = useTheme();
  const router = useRouter();
  const { resource } = router.query;

  const [groupedServiceProvidersSelectedOption, setGroupedServiceProvidersSelectedOption] =
    useState<GroupedServiceProvidersOption | null>(null);

  const [searchInput, setSearchInput] = useState(groupedServiceProvidersList.searchString ?? '');
  const searchChanged = useRef(false);

  const adaptedGroupedOptions = useMemo(
    () =>
      groupedServiceProvidersList.providers.flatMap((provider) =>
        provider?.items.map((option) => ({ ...option, type: provider.groupTitle }))
      ),
    [groupedServiceProvidersList.providers]
  );

  useEffect(() => {
    if (typeof resource === 'string') {
      const option = adaptedGroupedOptions.find(({ id }) => id === resource);

      if (option) {
        setGroupedServiceProvidersSelectedOption(option);
        onChange(option);
      }
    }
  }, [adaptedGroupedOptions, onChange, resource]);

  useEffect(() => {
    if (groupedServiceProvidersList.providers.length === 0 && groupedServiceProvidersList.currentPage === 0) {
      dispatch(
        bookingMiddleware.getGroupedServiceProviders(
          {
            page: 1
          },
          isSpecimenCollection
        )
      );
    }
  }, [isSpecimenCollection, groupedServiceProvidersList]);

  const onBottomReach = useCallback(
    (currentPage: number) => {
      dispatch(
        bookingMiddleware.getNewGroupedServiceProviders(
          {
            page: currentPage,
            ...(groupedServiceProvidersList.searchString
              ? { searchString: groupedServiceProvidersList.searchString }
              : {})
          },
          isSpecimenCollection
        )
      );
    },
    [isSpecimenCollection, groupedServiceProvidersList.searchString]
  );

  const { onScroll: onServiceProviderScroll, resetScroll } = usePaginatedAutoCompleteScroll(
    1,
    Math.max(groupedServiceProvidersList.currentPage, 1),
    isLoading,
    groupedServiceProvidersList.pageSize,
    groupedServiceProvidersList.totalItems,
    onBottomReach
  );

  const handleThrottleSearch = useCallback(
    (searchString: string) => {
      dispatch(
        bookingMiddleware.getGroupedServiceProviders(
          {
            page: 1,
            searchString
          },
          isSpecimenCollection
        )
      );
    },
    [isSpecimenCollection]
  );

  const throttleFn = useLodashThrottle(handleThrottleSearch);

  useEffect(() => {
    if (searchChanged.current) {
      resetScroll();
      searchChanged.current = false;
    }
  }, [groupedServiceProvidersList.searchString, resetScroll, searchChanged]);

  return (
    <Box sx={{ maxWidth: '240px' }}>
      <BaseDropdownWithLoading
        isLoading={isLoading}
        data-cy={dataCy}
        PopperComponent={GroupedServiceProvidersPopper}
        popupIcon={<KeyboardArrowDownIcon color="primary" />}
        forcePopupIcon
        inputValue={searchInput}
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
            onChange();
            setGroupedServiceProvidersSelectedOption(null);
          } else if (option) {
            setGroupedServiceProvidersSelectedOption(option as GroupedServiceProvidersOption);
            onChange(option as GroupedServiceProvidersOption);
          }
        }}
        onInputChange={(_event, searchString, reason) => {
          setSearchInput(searchString);

          if (reason === 'input' || reason === 'clear') {
            throttleFn(searchString);
            searchChanged.current = true;
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
