import React, { useEffect, useMemo } from 'react';
import Item from '@components/MedicalBackground/components/common/Item';
import CardContentWrapper from '@components/MedicalBackground/components/styled/CartContent';
import { MedicalBackgroundItemType } from '@components/MedicalBackground/components/types';
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
        const finalValue =
          mappedItem?.componentData?.type === MedicalBackgroundItemType.Date && !isDashValue(mappedItem?.viewValue)
            ? DateUtil.formatDateOnly(mappedItem?.viewValue)
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
