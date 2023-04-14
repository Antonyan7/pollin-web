import React, { useEffect, useMemo } from 'react';
import { FlexibleItemType } from '@components/common/Form/types';
import Item from '@components/MedicalBackground/components/common/Item';
import CardContentWrapper from '@components/MedicalBackground/components/styled/CartContent';
import { getDropdownByType } from '@components/MedicalBackground/helpers';
import { mapObjectByPattern } from '@components/MedicalBackground/helpers/mapper';
import mappingPattern from '@components/MedicalBackground/mapper/femalePatientGynaecologicalHistory';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { useRouter } from 'next/router';
import { v4 } from 'uuid';

import CircularLoading from '@ui-component/circular-loading';
import { DateUtil } from '@utils/date/DateUtil';
import { isDashValue } from '@utils/stringUtils';

const ViewModeContent = () => {
  const router = useRouter();
  const dropdownOptions = useAppSelector(patientsSelector.dropdowns);
  const femalePatientGynaecologicalHistory = useAppSelector(patientsSelector.femalePatientGynaecologicalHistory);
  const isFemalePatientGynaecologicalHistoryLoading = useAppSelector(
    patientsSelector.isFemalePatientGynaecologicalHistoryLoading
  );

  useEffect(() => {
    if (typeof router.query.id === 'string') {
      dispatch(patientsMiddleware.getFemalePatientGynaecologicalHistory(router.query.id));
    }
  }, [router.query.id]);

  const mappedItems = useMemo(
    () => mapObjectByPattern(femalePatientGynaecologicalHistory, mappingPattern),
    [femalePatientGynaecologicalHistory]
  );

  return !isFemalePatientGynaecologicalHistoryLoading ? (
    <CardContentWrapper>
      {mappedItems.map((mappedItem, index) => {
        let finalValue;

        if (mappedItem?.componentData?.type === FlexibleItemType.Date && !isDashValue(mappedItem?.viewValue)) {
          finalValue = DateUtil.formatDateOnly(mappedItem?.viewValue);
        } else if (mappedItem?.componentData?.type === FlexibleItemType.MultipleSelect && mappedItem.items.length) {
          const mappedItemOptions = getDropdownByType(
            dropdownOptions,
            mappedItem?.componentData?.dropdownType
          )?.options;

          finalValue = mappedItem.items.map(
            (item: { id: string }) =>
              mappedItemOptions?.find((mappedItemValue) => mappedItemValue.id === item.id)?.title
          );
        } else {
          finalValue = mappedItem?.viewValue;
        }

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
