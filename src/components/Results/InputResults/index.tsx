import React, { useEffect } from 'react';
import { dispatch, useAppSelector } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { useRouter } from 'next/router';

import MeasurementListForm from './MeasurementList/MeasurementListForm';

const InputResults = () => {
  const router = useRouter();
  const testResultDetails = useAppSelector(resultsSelector.testResultDetails);
  const testResultId = `${router.query.id}`;

  useEffect(() => {
    if (testResultId) {
      dispatch(resultsMiddleware.getTestResultDetails(testResultId));
    }
  }, [testResultId]);

  return testResultDetails && <MeasurementListForm />;
};

export default InputResults;
