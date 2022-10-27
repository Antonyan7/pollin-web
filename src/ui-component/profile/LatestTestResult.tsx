// material-ui
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import {
  Button,
  CardActions,
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
import { dispatch } from 'redux/hooks';
import { patientsSelector } from 'redux/slices/patients';
import { testResultsMiddleware, testResultsSelector } from 'redux/slices/testResults';

import MainCard from '@ui-component/cards/MainCard';
import Chip from '@ui-component/patient/Chip';

const LatestTestResults = () => {
  const patientId = useSelector(patientsSelector.currentPatientId);

  useEffect(() => {
    dispatch(testResultsMiddleware.getProfileTestResultLatest(patientId));
  }, [patientId]);

  const patientHighlights = useSelector(testResultsSelector.profileTestResult);
  const [t] = useTranslation();

  return (
    <MainCard title={t(Translation.PAGE_PATIENT_RESULT_TABLE_HEADER_TITLE)} content={false}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t(Translation.PAGE_PATIENT_RESULT_CELL_HEADER_TEST)}</TableCell>
              <TableCell>{t(Translation.PAGE_PATIENT_RESULT_CELL_HEADER_DATECOLLECTED)}</TableCell>
              <TableCell>{t(Translation.PAGE_PATIENT_RESULT_CELL_HEADER_DUEDATE)}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patientHighlights?.map((row) => {
              const cellChipColor = row.result === 'Normal' ? '' : 'error';

              return (
                <TableRow hover key={row.title}>
                  <TableCell>
                    <Typography variant="h5">{row.title}</Typography>
                  </TableCell>
                  <TableCell>{timeAdjuster(new Date(row.dateCollected)).customizedDate}</TableCell>
                  <TableCell>
                    <Chip chipColor={cellChipColor} label={row.result} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button variant="text">
          {t(Translation.PAGE_PATIENT_RESULT_BUTTON)}
          <ChevronRightOutlinedIcon />
        </Button>
      </CardActions>
    </MainCard>
  );
};

export default LatestTestResults;
