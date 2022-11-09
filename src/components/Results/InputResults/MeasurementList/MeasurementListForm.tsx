import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AttachFile from '@components/AttachFile';
import MeasurementList from '@components/Results/InputResults/MeasurementList';
import ResultsSaveButton from '@components/Results/InputResults/SaveButton';
import TextFieldWithLabel from '@components/TextFieldWithLabel';
import { ArrowBackIos } from '@mui/icons-material';
import { Divider, Grid, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useAppSelector } from '@redux/hooks';
import { resultsSelector } from '@redux/slices/results';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { margins, paddings } from 'themes/themeConstants';
import { ITestResultItem } from 'types/reduxTypes/resultsStateTypes';

import SubCardStyled from '@ui-component/cards/SubCardStyled';

import InputResultsHeader from '../Header';

const MeasurementListForm = () => {
  const [t] = useTranslation();
  const router = useRouter();
  const testResultDetails = useAppSelector(resultsSelector.testResultDetails);
  const form = useForm({
    defaultValues: {
      data: testResultDetails?.items?.map((item: ITestResultItem) => ({
        resultType: item.resultType,
        dateReceived: item.dateReceived,
        result: item.result
      }))
    },
    shouldUnregister: false
  });

  const handleBackToExternalResultsPage = () => router.back();

  return (
    <SubCardStyled
      sx={{
        mt: margins.top20
      }}
      title={
        <Box component="span" display="flex" alignItems="center">
          <IconButton color="primary" onClick={handleBackToExternalResultsPage}>
            <ArrowBackIos fontSize="small" />
          </IconButton>
          <Typography variant="h4" fontWeight={500}>
            {t(Translation.PAGE_INPUT_RESULTS_BACK_TO_EXTERNAL_RESULTS)}
          </Typography>
        </Box>
      }
    >
      {testResultDetails && (
        <FormProvider {...form}>
          <InputResultsHeader
            title={testResultDetails?.title}
            dates={testResultDetails?.dates}
            lab={testResultDetails?.lab}
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
          <ResultsSaveButton />
        </FormProvider>
      )}
    </SubCardStyled>
  );
};

export default MeasurementListForm;
