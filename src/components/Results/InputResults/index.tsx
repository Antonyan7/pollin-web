import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AttachFile from '@components/AttachFile';
import MeasurementList from '@components/Results/InputResults/MeasurementList';
import TextFieldWithLabel from '@components/TextFieldWithLabel';
import { ArrowBackIos } from '@mui/icons-material';
import { Divider, Grid, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { dispatch, useAppSelector } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { margins, paddings } from 'themes/themeConstants';

import SubCardStyled from '@ui-component/cards/SubCardStyled';
import { ButtonWithLoading } from '@ui-component/common/buttons';

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
      {testResultDetails?.items && <MeasurementList listItems={testResultDetails?.items} />}
      <Grid px={paddings.leftRight24}>
        <Divider sx={{ my: margins.topBottom8 }} />
        <TextFieldWithLabel
          label={t(Translation.COMMENTS_TEXTFIELD_LABEL)}
          placeholder={t(Translation.COMMENTS_TEXTFIELD_LABEL)}
        />
        <Divider sx={{ mt: margins.top24, mb: margins.bottom16 }} />
        <AttachFile />
      </Grid>
      <Divider sx={{ mt: margins.top12 }} />
      <Grid p={paddings.all20} display="flex" justifyContent="end">
        {/* isLoading={false} is temporary, the logic will be added by the next tickets */}
        <ButtonWithLoading isLoading={false} sx={{ fontWeight: 600 }}>
          {t(Translation.PAGE_INPUT_RESULTS_TEST_SAVE_AS_FINAL)}
        </ButtonWithLoading>
      </Grid>
    </SubCardStyled>
  );
};

export default InputResults;
