import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LatestTestResultType } from '@axios/patientEmr/managerPatientEmrTypes';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import {
  Button,
  CardActions,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { Translation } from 'constants/translations';
import { timeAdjuster } from 'helpers/timeAdjuster';
import { dispatch, useAppSelector } from 'redux/hooks';
import { patientsMiddleware, patientsSelector } from 'redux/slices/patients';

import SubCardStyled from '@ui-component/cards/SubCardStyled';
import Chip from '@ui-component/patient/Chip';

const LatestTestResults = () => {
  const patientId = useAppSelector(patientsSelector.currentPatientId);
  const [t] = useTranslation();
  const latestTestResults = useAppSelector(patientsSelector.latestTestResults);

  useEffect(() => {
    if (patientId) {
      dispatch(patientsMiddleware.getProfileTestResultLatest(patientId));
    }
  }, [patientId]);

  return (
    <SubCardStyled title={t(Translation.PAGE_PATIENT_LATEST_TEST_RESULT_TITLE)} content={false}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t(Translation.PAGE_PATIENT_LATEST_TEST_RESULT_TABLE_HEADER_TEST)}</TableCell>
              <TableCell>{t(Translation.PAGE_PATIENT_LATEST_TEST_RESULT_TABLE_HEADER_DATE_COLLECTED)}</TableCell>
              <TableCell>{t(Translation.PAGE_PATIENT_LATEST_TEST_RESULT_TABLE_HEADER_DUE_DATE)}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {latestTestResults?.map((latestTestResult) => {
              const cellChipColor = latestTestResult.result === LatestTestResultType.Normal ? '' : 'error';

              return (
                <TableRow hover key={latestTestResult.title}>
                  <TableCell>
                    <Typography variant="h5">{latestTestResult.title}</Typography>
                  </TableCell>
                  <TableCell>{timeAdjuster(new Date(latestTestResult.dateCollected)).customizedDate}</TableCell>
                  <TableCell>
                    <Chip chipColor={cellChipColor} label={latestTestResult.result} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <CardActions>
        <Grid container justifyContent="right">
          <Button variant="text">
            {t(Translation.COMMON_BUTTON_VIEW_ALL)}
            <ChevronRightOutlinedIcon />
          </Button>
        </Grid>
      </CardActions>
    </SubCardStyled>
  );
};

export default LatestTestResults;
