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
  Typography,
  useTheme
} from '@mui/material';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { dispatch, useAppSelector } from 'redux/hooks';
import { patientsMiddleware, patientsSelector } from 'redux/slices/patients';
import { margins, paddings } from 'themes/themeConstants';
import { v5 as uuidv5 } from 'uuid';

import SubCardStyled from '@ui-component/cards/SubCardStyled';
import Chip from '@ui-component/patient/Chip';
import { DateUtil } from '@utils/date/DateUtil';

const LatestTestResults = () => {
  const patientId = useAppSelector(patientsSelector.currentPatientId);
  const [t] = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  const latestTestResults = useAppSelector(patientsSelector.latestTestResults);

  useEffect(() => {
    if (patientId) {
      dispatch(patientsMiddleware.getProfileTestResultLatest(patientId));
    }
  }, [patientId]);

  return (
    <SubCardStyled
      title={t(Translation.PAGE_PATIENT_LATEST_TEST_RESULT_TITLE)}
      titleProps={{
        fontWeight: 500,
        pr: paddings.right12,
        fontSize: theme.typography.pxToRem(14),
        color: theme.palette.secondary[800]
      }}
      cardContent={false}
    >
      {latestTestResults.length ? (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight={500}>
                      {t(Translation.PAGE_PATIENT_LATEST_TEST_RESULT_TABLE_HEADER_TEST)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={500}>
                      {t(Translation.PAGE_PATIENT_LATEST_TEST_RESULT_TABLE_HEADER_DATE_COLLECTED)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={500}>
                      {t(Translation.PAGE_PATIENT_LATEST_TEST_RESULT_TABLE_HEADER_RESULT)}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {latestTestResults?.map((latestTestResult, index) => {
                  const cellChipColor = latestTestResult.result === LatestTestResultType.Normal ? 'active' : 'inActive';
                  // TODO update key TEAMA-5461
                  const hashKey = uuidv5(JSON.stringify(latestTestResult).concat(index.toString()), uuidv5.URL);

                  return (
                    <TableRow hover key={hashKey}>
                      <TableCell>
                        <Typography fontWeight={500} variant="h5">
                          {latestTestResult.title}
                        </Typography>
                      </TableCell>
                      <TableCell>{DateUtil.formatDateOnly(latestTestResult.dateCollected)}</TableCell>
                      <TableCell width={30}>
                        <Chip
                          sx={{
                            mr: margins.right64
                          }}
                          chipColor={cellChipColor}
                          label={latestTestResult.result}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <CardActions>
            <Grid container justifyContent="right">
              <Button variant="text" onClick={() => router.push(`/patient-emr/details/${patientId}/orders/results`)}>
                {t(Translation.COMMON_BUTTON_VIEW_ALL)}
                <ChevronRightOutlinedIcon />
              </Button>
            </Grid>
          </CardActions>
        </>
      ) : (
        <Typography py={paddings.topBottom24} textAlign="center">
          {t(Translation.PAGE_PATIENT_WIDGET_DATA_IS_NOT_AVAILABLE)}
        </Typography>
      )}
    </SubCardStyled>
  );
};

export default LatestTestResults;
