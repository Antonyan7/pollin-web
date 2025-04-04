import React, { FC, Fragment, useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AttachFile from '@components/AttachFile';
import MeasurementList from '@components/Results/InputResults/MeasurementList';
import ResultsSaveButton from '@components/Results/InputResults/SaveButton';
import TextFieldWithLabel from '@components/TextFieldWithLabel';
import { Divider, Grid, Stack } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { margins, paddings } from 'themes/themeConstants';

import SubCardStyled from '@ui-component/cards/SubCardStyled';
import CircularLoading from '@ui-component/circular-loading';

import ResultsCancelButton from '../CancelButton';
import TestResultsContext from '../context/TestResult';
import InputResultsHeader from '../Header';
import { InputResultTestType, MeasurementListFormProps } from '../types';

import ListHeader from './header';
import extractFormDataFromTestResultsDetails from './helpers';

const MeasurementListForm: FC<MeasurementListFormProps> = ({ testType = '' }) => {
  const testResultsDetails = useAppSelector(resultsSelector.testResultsDetails);
  const isTestResultsDetailsLoading = useAppSelector(resultsSelector.isTestResultsDetailsLoading);

  const [t] = useTranslation();
  const router = useRouter();

  const currentTestResultPageId = `${router.query.id}`;
  const isInHouseTest = testType === InputResultTestType.InHouse;
  const methods = useForm();

  useEffect(() => {
    if (currentTestResultPageId) {
      const currentPageRequestParams = isInHouseTest
        ? { specimenId: currentTestResultPageId }
        : { testResultId: currentTestResultPageId };

      dispatch(resultsMiddleware.getTestResultsDetails(currentPageRequestParams));
    }
  }, [currentTestResultPageId, isInHouseTest]);

  const formFieldNames = useMemo(() => {
    const { formDefaultFieldValues, formDefaultFieldsNames } =
      extractFormDataFromTestResultsDetails(testResultsDetails);

    methods.reset({
      ...formDefaultFieldValues
    });

    return formDefaultFieldsNames;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testResultsDetails]);

  const testResultValues = useMemo(
    () => ({
      type: testType
    }),
    [testType]
  );

  return (
    <TestResultsContext.Provider value={testResultValues}>
      <SubCardStyled
        sx={{
          mt: margins.top20
        }}
        title={<ListHeader isInHouseTest={isInHouseTest} />}
      >
        {isTestResultsDetailsLoading ? (
          <Grid p={paddings.all24}>
            <CircularLoading />
          </Grid>
        ) : (
          <FormProvider {...methods}>
            {testResultsDetails.map((testResultDetails, index: number) => {
              const currentFormFieldName = `data_${testResultDetails.id}`;
              const currentFormCommentFieldName = `${currentFormFieldName}.comment`;
              // Show specimenId only when it is available and when it is first test result;
              const shouldShowSpecimenId = index === 0 && isInHouseTest;
              // Pick last item of test results and show save button
              const shouldShowSaveButton = index === testResultsDetails.length - 1;
              // Is multiple test results
              const shouldShowSaveAsCompleted = !!isInHouseTest;

              return (
                <Fragment key={testResultDetails.id}>
                  <InputResultsHeader
                    title={testResultDetails.title}
                    dates={testResultDetails.dates}
                    lab={testResultDetails.lab}
                    currentFormFieldName={currentFormFieldName}
                    isInHouseTest={isInHouseTest}
                    {...(shouldShowSpecimenId && { specimenId: `${router.query?.specimenId}` })}
                  />
                  {testResultDetails.items.length > 0 && (
                    <MeasurementList
                      listItems={testResultDetails.items}
                      currentFormFieldName={currentFormFieldName}
                      title={testResultDetails.title}
                    />
                  )}
                  <Grid px={paddings.leftRight24}>
                    <Divider sx={{ my: margins.topBottom8 }} />
                    <TextFieldWithLabel
                      label={t(Translation.COMMENTS_TEXT_FIELD_LABEL)}
                      placeholder={t(Translation.COMMENTS_TEXT_FIELD_LABEL)}
                      currentFormFieldName={currentFormCommentFieldName}
                    />
                    <Divider sx={{ mt: margins.top24, mb: margins.bottom16 }} />
                    <AttachFile currentFormFieldName={currentFormFieldName} />
                  </Grid>
                  <Divider sx={{ mt: margins.top12 }} />
                  {shouldShowSaveButton && (
                    <Grid item p={paddings.all20} display="flex" justifyContent="end">
                      <Stack display="flex" flexDirection="row" columnGap={2}>
                        {shouldShowSaveAsCompleted && <ResultsCancelButton />}
                        <ResultsSaveButton
                          shouldSaveAsCompleted={shouldShowSaveAsCompleted}
                          currentFormFieldNames={formFieldNames}
                        />
                      </Stack>
                    </Grid>
                  )}
                </Fragment>
              );
            })}
          </FormProvider>
        )}
      </SubCardStyled>
    </TestResultsContext.Provider>
  );
};

export default MeasurementListForm;
