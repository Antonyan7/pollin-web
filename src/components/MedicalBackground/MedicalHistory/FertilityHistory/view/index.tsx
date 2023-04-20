import React, { useEffect, useMemo } from 'react';
import { FlexibleItemType } from '@components/common/Form/types';
import Item from '@components/MedicalBackground/components/common/Item';
import CardContentWrapper from '@components/MedicalBackground/components/styled/CartContent';
import { getDropdownOption } from '@components/MedicalBackground/helpers';
import { mapObjectByPattern } from '@components/MedicalBackground/helpers/mapper';
import mappingPattern from '@components/MedicalBackground/mapper/fertilityHistory';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { useRouter } from 'next/router';
import { v4 } from 'uuid';

import CircularLoading from '@ui-component/circular-loading';

const ViewModeContent = () => {
  const router = useRouter();
  const fertilityHistory = useAppSelector(patientsSelector.fertilityHistory);
  const dropdownOptions = useAppSelector(patientsSelector.dropdowns);
  const isFertilityHistoryLoading = useAppSelector(patientsSelector.isFertilityHistoryLoading);

  useEffect(() => {
    if (typeof router.query.id === 'string') {
      dispatch(patientsMiddleware.getFertilityHistory(router.query.id));
    }
  }, [router.query.id]);

  const mappedItems = useMemo(() => mapObjectByPattern(fertilityHistory, mappingPattern), [fertilityHistory]);

  return !isFertilityHistoryLoading ? (
    <CardContentWrapper>
      {mappedItems.map((mappedItem, index) => {
        const finalValue =
          mappedItem?.componentData?.type === FlexibleItemType.Dropdown
            ? getDropdownOption(dropdownOptions, mappedItem?.componentData?.dropdownType, mappedItem?.viewValue)
                ?.title ?? '-'
            : mappedItem?.viewValue;

        return (
          <Item
            key={v4()}
            title={mappedItem?.title as string}
            index={index}
            value={finalValue}
            note={mappedItem?.note}
          />
        );
      })}
    </CardContentWrapper>
  ) : (
    <CircularLoading />
  );
};

export default ViewModeContent;
