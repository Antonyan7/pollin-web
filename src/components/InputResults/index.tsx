import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowBackIos } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { dispatch, useAppSelector } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { margins } from 'themes/themeConstants';

import SubCardStyled from '@ui-component/cards/SubCardStyled';

import InputResultsHeader from './Header';

const InputResults = () => {
  const [t] = useTranslation();
  const router = useRouter();
  const testResultDetails = useAppSelector(resultsSelector.testResultDetails);
  const testResultId = `${router.query.id}`;

  useEffect(() => {
    if (testResultId) {
      dispatch(resultsMiddleware.getTestResultDetails(testResultId));
    }
  }, [testResultId]);

  const handleBackToExternalReusltsPage = () => router.back();

  return (
    <SubCardStyled
      sx={{
        mt: margins.top20
      }}
      title={
        <Box component="span" display="flex" alignItems="center">
          <IconButton color="primary" onClick={handleBackToExternalReusltsPage}>
            <ArrowBackIos fontSize="small" />
          </IconButton>
          <Typography variant="h4" fontWeight={500}>
            {t(Translation.PAGE_INPUT_RESULTS_BACK_TO_EXTERNAL_RESULTS)}
          </Typography>
        </Box>
      }
    >
      <InputResultsHeader
        title={testResultDetails?.title}
        dates={testResultDetails?.dates}
        lab={testResultDetails?.lab}
        finalResultType={testResultDetails?.finalResultType}
      />
    </SubCardStyled>
  );
};

export default InputResults;
