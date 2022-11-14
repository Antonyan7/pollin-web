import React, { useEffect } from 'react';
import { dispatch, useAppSelector } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { useRouter } from 'next/router';

import MeasurementListForm from './MeasurementList/MeasurementListForm';
import { InputResultsProps, InputResultTestType } from './types';

const InputResults: React.FC<InputResultsProps> = ({ testType }) => {
  const testResultsDetails = useAppSelector(resultsSelector.testResultsDetails);
  const router = useRouter();

  const currentTestResultPageId = `${router.query.id}`;
  const isInHouseTest = testType === InputResultTestType.InHouse;

  useEffect(() => {
    if (currentTestResultPageId) {
      const currentPageRequestParams = isInHouseTest
        ? { specimenId: currentTestResultPageId }
        : { testResultId: currentTestResultPageId };

      dispatch(resultsMiddleware.getTestResultsDetails(currentPageRequestParams));
    }
  }, [currentTestResultPageId, isInHouseTest]);

  return testResultsDetails.length ? (
    <MeasurementListForm {...(isInHouseTest && { specimenId: currentTestResultPageId })} />
  ) : null;
};

export default InputResults;
