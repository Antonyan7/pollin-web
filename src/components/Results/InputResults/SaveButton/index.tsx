import React, { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';
import { ITestResultItem } from 'types/reduxTypes/resultsStateTypes';

import { ButtonWithLoading } from '@ui-component/common/buttons';

const ResultsSaveButton: React.FC = () => {
  const [t] = useTranslation();
  const { control } = useFormContext();

  const measurements = useWatch({ name: 'data', control });

  const detectSaveButtonState = useMemo(() => {
    // TODO here we should add case when no file uploaded yet when that part will be done
    const results = measurements.map(
      (item: ITestResultItem) => !!(item.resultType && item.result && item.dateReceived)
    );

    const allNecessaryFieldsAreFilled = results.every((every: boolean) => every);

    if (allNecessaryFieldsAreFilled) {
      return t(Translation.PAGE_INPUT_RESULTS_TEST_SAVE_AS_FINAL);
    }

    return t(Translation.PAGE_INPUT_RESULTS_TEST_SAVE_AS_PENDING);
  }, [measurements, t]);

  return (
    <Grid p={paddings.all20} display="flex" justifyContent="end">
      {/* isLoading={false} is temporary, the logic will be added by the next tickets */}
      <ButtonWithLoading isLoading={false} sx={{ fontWeight: 600 }}>
        {detectSaveButtonState}
      </ButtonWithLoading>
    </Grid>
  );
};

export default ResultsSaveButton;
