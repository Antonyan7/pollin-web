import React, { useEffect, useMemo } from 'react';
import Item from '@components/MedicalBackground/components/common/Item';
import CardContentWrapper from '@components/MedicalBackground/components/styled/CartContent';
import { mapObjectByPattern } from '@components/MedicalBackground/helpers/mapper';
import MedicalBackgroundCard from '@components/MedicalBackground/layout';
import mappingPattern from '@components/MedicalBackground/mapper/feritlityHistory';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { useRouter } from 'next/router';
import { v4 } from 'uuid';

import CircularLoading from '@ui-component/circular-loading';

const ViewComponent = () => {
  const router = useRouter();
  const fertilityHistory = useAppSelector(patientsSelector.fertilityHistory);
  const isFertilityHistoryLoading = useAppSelector(patientsSelector.isFertilityHistoryLoading);

  useEffect(() => {
    if (typeof router.query.id === 'string') {
      dispatch(patientsMiddleware.getFertilityHistory(router.query.id));
    }
  }, [router.query.id]);

  const mappedItems = useMemo(() => mapObjectByPattern(fertilityHistory, mappingPattern), [fertilityHistory]);

  return !isFertilityHistoryLoading ? (
    <CardContentWrapper>
      {mappedItems.map((mappedItem, index) => (
        <Item
          key={v4()}
          title={mappedItem.title}
          index={index}
          value={mappedItem.item.value}
          note={mappedItem.item.note}
        />
      ))}
    </CardContentWrapper>
  ) : (
    <CircularLoading />
  );
};

const EditComponent = () => <h1>Edit</h1>;

const FertilityHistory = () => (
  <MedicalBackgroundCard title="Fertility History" ViewComponent={ViewComponent} EditComponent={EditComponent} />
);

export default FertilityHistory;
