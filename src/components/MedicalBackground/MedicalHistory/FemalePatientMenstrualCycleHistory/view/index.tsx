/* eslint-disable no-case-declarations */
import React, { useEffect, useMemo } from 'react';
import { FlexibleItemType } from '@components/common/Form/types';
import Item from '@components/MedicalBackground/components/common/Item';
import CardContentWrapper from '@components/MedicalBackground/components/styled/CartContent';
import NOT_APPLICABLE from '@components/MedicalBackground/constants';
import { MedicalFormRadioValues } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { getDropdownOption, isNullValue } from '@components/MedicalBackground/helpers';
import { mapObjectByPattern } from '@components/MedicalBackground/helpers/mapper';
import mappingPattern from '@components/MedicalBackground/mapper/femalePatientMenstrualCycleHistory';
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
      {mappedItems.map((mappedItem, index) => {
        let finalValue;

        switch (mappedItem?.componentData?.type) {
          case FlexibleItemType.Dropdown:
            const dropdownOptionTitle = getDropdownOption(
              dropdownOptions,
              mappedItem?.componentData?.dropdownType,
              mappedItem?.viewValue
            )?.title;

            const isNotApplicable = mappedItem?.viewValue === NOT_APPLICABLE;
            const additionalLabel = !isNotApplicable ? mappedItem?.componentData?.additionalLabel ?? '' : '';

            finalValue = dropdownOptionTitle ? `${dropdownOptionTitle} ${additionalLabel}` : mappedItem?.viewValue;
            break;
          case FlexibleItemType.Date:
            finalValue = isDashValue(mappedItem?.viewValue)
              ? mappedItem?.viewValue
              : DateUtil.formatDateOnly(mappedItem?.viewValue);
            break;
          case FlexibleItemType.Radio:
            finalValue = !(MedicalFormRadioValues.No && isNullValue(mappedItem?.value)) ? mappedItem.viewValue : '-';
            break;
          default:
            finalValue = mappedItem?.viewValue;
            break;
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
