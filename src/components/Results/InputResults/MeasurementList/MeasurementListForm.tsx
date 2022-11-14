import React, { FC, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AttachFile from '@components/AttachFile';
import MeasurementList from '@components/Results/InputResults/MeasurementList';
import ResultsSaveButton from '@components/Results/InputResults/SaveButton';
import TextFieldWithLabel from '@components/TextFieldWithLabel';
import { ArrowBackIos } from '@mui/icons-material';
import { Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useAppSelector } from '@redux/hooks';
import { resultsSelector } from '@redux/slices/results';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { margins, paddings } from 'themes/themeConstants';

import SubCardStyled from '@ui-component/cards/SubCardStyled';

import ResultsCancelButton from '../CancelButton';
import InputResultsHeader from '../Header';
import { MeasurementListFormProps } from '../types';

import extractFormDataFromTestResultsDetails from './helpers';

const MeasurementListForm: FC<MeasurementListFormProps> = ({ specimenId = '' }) => {
  const [t] = useTranslation();
  const router = useRouter();
  const testResultsDetails = useAppSelector(resultsSelector.testResultsDetails);

  const { formDefaultFieldValues, formDefaultFieldsNames } = useMemo(
    () => extractFormDataFromTestResultsDetails(testResultsDetails),
    [testResultsDetails]
  );

  const inputResultsBackToPageLabel = specimenId
    ? t(Translation.PAGE_IN_HOUSE_RESULTS_BACK_TO_IN_HOUSE_TESTS)
    : t(Translation.PAGE_INPUT_RESULTS_BACK_TO_EXTERNAL_RESULTS);

  const form = useForm({
    defaultValues: {
      ...formDefaultFieldValues
    },
    shouldUnregister: false
  });

  const handleBackToPreviousPage = () => router.back();

  return (
    <SubCardStyled
      sx={{
        mt: margins.top20
      }}
      title={
        <Box component="span" display="flex" alignItems="center">
          <IconButton color="primary" onClick={handleBackToPreviousPage}>
            <ArrowBackIos fontSize="small" />
          </IconButton>
          <Typography variant="h4" fontWeight={500}>
            {inputResultsBackToPageLabel}
          </Typography>
        </Box>
      }
    >
      {testResultsDetails.length > 0 && (
        <FormProvider {...form}>
          {testResultsDetails.map((testResultDetails, index) => {
            const currentFormFieldName = `data_${testResultDetails.id}`;
            // Show specimenId only when it is available and when it is first test result;
            const shouldShowSpeicmenId = index === 0 && specimenId;
            // Pick last item of test results and show save button
            const shouldShowSaveButton = index === testResultsDetails.length - 1;
            // Is multiple test results
            const shouldShowSaveAsCompleted = formDefaultFieldsNames.length > 1;

            return (
              <>
                <InputResultsHeader
                  title={testResultDetails.title}
                  dates={testResultDetails.dates}
                  lab={testResultDetails.lab}
                  currentFormFieldName={currentFormFieldName}
                  {...(shouldShowSpeicmenId && { specimenId })}
                />
                {testResultDetails.items.length > 0 && (
                  <MeasurementList listItems={testResultDetails.items} currentFormFieldName={currentFormFieldName} />
                )}
                <Grid px={paddings.leftRight24}>
                  <Divider sx={{ my: margins.topBottom8 }} />
                  <TextFieldWithLabel
                    label={t(Translation.COMMENTS_TEXTFIELD_LABEL)}
                    placeholder={t(Translation.COMMENTS_TEXTFIELD_LABEL)}
                  />
                  {testResultDetails.isAttachmentRequired && (
                    <>
                      <Divider sx={{ mt: margins.top24, mb: margins.bottom16 }} />
                      <AttachFile />
                    </>
                  )}
                </Grid>
                <Divider sx={{ mt: margins.top12 }} />
                {shouldShowSaveButton && (
                  <Grid item p={paddings.all20} display="flex" justifyContent="end">
                    <Stack display="flex" flexDirection="row" columnGap={2}>
                      {shouldShowSaveAsCompleted && <ResultsCancelButton />}
                      <ResultsSaveButton
                        shouldSaveAsCompleted={shouldShowSaveAsCompleted}
                        currentFormFieldNames={formDefaultFieldsNames}
                      />
                    </Stack>
                  </Grid>
                )}
              </>
            );
          })}
        </FormProvider>
      )}
    </SubCardStyled>
  );
};

export default MeasurementListForm;
