import React from 'react';
import { useTranslation } from 'react-i18next';
import { ITestTypeItem, TestResultItemType } from '@axios/patientEmr/managerPatientEmrTypes';
import TestHistoryHint from '@components/PatientProfile/TestHistoryHint';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Button, Typography, useTheme } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { heights, margins, widths } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

const TestResultItem = ({ title, type, id: testTypeId }: ITestTypeItem) => {
  const [t] = useTranslation();
  const theme = useTheme();
  const currentPatientId = useAppSelector(patientsSelector.currentPatientId);
  const onViewTestResultsClick = () => {
    if (testTypeId) {
      dispatch(patientsMiddleware.getProfileTestResultDetails(testTypeId, type, currentPatientId));
      dispatch(
        viewsMiddleware.openModal({
          name: ModalName.PatientTestResultDetailsModal,
          props: {}
        })
      );
    }
  };

  return (
    <>
      {type === TestResultItemType.NONE && <Typography>{title}</Typography>}
      {type === TestResultItemType.TEST_TYPE && testTypeId && (
        <TestHistoryHint testResultId={testTypeId}>
          <Typography sx={{ textDecoration: 'underline' }} color={theme.palette.grey[700]}>
            {title}
          </Typography>
        </TestHistoryHint>
      )}
      {type === TestResultItemType.ORDER_GROUP && testTypeId && (
        <Button
          variant="text"
          data-cy={CypressIds.PAGE_PATIENT_WIDGET_TEST_RESULTS_BUTTON_VIEW_TEST_RESULTS}
          disableRipple
          size="medium"
          sx={{
            p: 0,
            textTransform: 'none',
            '&:hover': { background: 'transparent', textDecoration: 'underline' }
          }}
          onClick={onViewTestResultsClick}
        >
          <Typography component="span" display="flex" alignItems="center" fontWeight={500} gap={margins.leftRight8}>
            {t(Translation.PAGE_PATIENT_WIDGET_TEST_RESULTS_BUTTON_VIEW_TEST_RESULTS)}
            <ChevronRightIcon fontSize="small" sx={{ height: heights.height18, width: widths.width18 }} />
          </Typography>
        </Button>
      )}
    </>
  );
};

export default TestResultItem;
