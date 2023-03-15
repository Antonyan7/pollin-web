import React, { useEffect, useMemo } from 'react';
import Item from '@components/MedicalBackground/components/common/Item';
import CardContentWrapper from '@components/MedicalBackground/components/styled/CartContent';
import { mapObjectByPattern } from '@components/MedicalBackground/helpers/mapper';
import mappingPattern from '@components/MedicalBackground/mapper/femalePatientMenstrualCycleHistory';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { useRouter } from 'next/router';
import { v4 } from 'uuid';

import CircularLoading from '@ui-component/circular-loading';

const ViewModeContent = () => {
  const router = useRouter();
  const femalePatientMenstrualCycleHistory = useAppSelector(patientsSelector.femalePatientMenstrualCycleHistory);
  const isFemalePatientMenstrualCycleHistoryLoading = useAppSelector(
    patientsSelector.isFemalePatientMenstrualCycleHistoryLoading
  );

  useEffect(() => {
    if (typeof router.query.id === 'string') {
      dispatch(patientsMiddleware.getFemalePatientMenstrualCycleHistory(router.query.id));
    }
  }, [router.query.id]);

  const mappedItems = useMemo(
    () => mapObjectByPattern(femalePatientMenstrualCycleHistory, mappingPattern),
    [femalePatientMenstrualCycleHistory]
  );

  return !isFemalePatientMenstrualCycleHistoryLoading ? (
    <CardContentWrapper>
      {mappedItems.map((mappedItem, index) => (
        <Item
          key={v4()}
          title={mappedItem?.title as string}
          index={index}
          value={mappedItem?.item.value}
          note={mappedItem?.item.note}
        />
      ))}
    </CardContentWrapper>
  ) : (
    <CircularLoading />
  );
};

export default ViewModeContent;
