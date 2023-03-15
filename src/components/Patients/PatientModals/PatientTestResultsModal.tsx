import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { LatestTestResultType } from '@axios/patientEmr/managerPatientEmrTypes';
import TestHistoryHint from '@components/PatientProfile/TestHistoryHint';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  DialogProps,
  DialogTitle,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme
} from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { margins, paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import ViewModal from '@ui-component/Modal/ViewModal';
import Chip from '@ui-component/patient/Chip';
import { formatDate } from '@utils/dateUtils';

const PatientTestResultsModal = () => {
  const theme = useTheme();
  const router = useRouter();
  const [t] = useTranslation();
  const patientId = useAppSelector(patientsSelector.currentPatientId);
  const testResultDetailItems = useAppSelector(patientsSelector.profileTestResultDetails);
  const onClose = useCallback(() => dispatch(viewsMiddleware.closeModal(ModalName.PatientTestResultDetailsModal)), []);
  const closeOnOutsideClick = useCallback<NonNullable<DialogProps['onClose']>>(
    (_e, reason) => {
      if (reason === 'backdropClick') {
        onClose();
      }
    },
    [onClose]
  );

  const onGoToTestResultsClick = useCallback(() => {
    onClose();
    router.push(`/patient-emr/details/${patientId}/orders/results`);
  }, [onClose, patientId, router]);

  return (
    <ViewModal
      maxWidth="md"
      onClose={closeOnOutsideClick}
      header={
        <DialogTitle
          variant="h2"
          mt={margins.top12}
          mb={margins.bottom24}
          mx={margins.leftRight16}
          fontWeight={500}
          color={theme.palette.common.black}
          textTransform="capitalize"
          borderBottom={`1px solid ${theme.palette.grey[300]}`}
        >
          {t(Translation.MODAL_PATIENT_TEST_RESULTS_TITLE)}
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: margins.right20,
              top: margins.top16,
              color: theme.palette.grey[500]
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      }
      content={
        <Stack spacing={4} px={paddings.leftRight20}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight={500}>
                      {t(Translation.MODAL_PATIENT_TEST_RESULTS_TABLE_DATE_COMPLETED)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={500}>
                      {t(Translation.MODAL_PATIENT_TEST_RESULTS_TABLE_TEST_PANEL_NAME)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={500}>{t(Translation.MODAL_PATIENT_TEST_RESULTS_TABLE_UNIT)}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={500}>{t(Translation.MODAL_PATIENT_TEST_RESULTS_TABLE_RESULT)}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={500}>{t(Translation.MODAL_PATIENT_TEST_RESULTS_TABLE_STATUS)}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={500}>
                      {t(Translation.MODAL_PATIENT_TEST_RESULTS_TABLE_FINAL_RESULT_TYPE)}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {testResultDetailItems?.map(
                  ({ dateCompleted, title, unit, result, status, finalResultType, testTypeId }, index) => {
                    const cellChipColor = finalResultType === LatestTestResultType.Normal ? 'active' : 'inActive';

                    return (
                      // eslint-disable-next-line react/no-array-index-key
                      <TableRow hover key={index}>
                        <TableCell>{formatDate(dateCompleted, 'MMM dd, yyy')}</TableCell>
                        <TableCell>{title}</TableCell>
                        <TableCell>{unit}</TableCell>
                        <TableCell>
                          {testTypeId ? (
                            <TestHistoryHint testResultId={testTypeId}>
                              <Typography component="span" sx={{ '&:hover': { textDecoration: 'underline' } }}>
                                {result}
                              </Typography>
                            </TestHistoryHint>
                          ) : (
                            result
                          )}
                        </TableCell>
                        <TableCell>{status}</TableCell>
                        <TableCell>
                          <Chip chipColor={cellChipColor} label={finalResultType} />
                        </TableCell>
                      </TableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      }
      footer={
        <Button color="primary" variant="outlined" disableTouchRipple onClick={onGoToTestResultsClick}>
          {t(Translation.MODAL_PATIENT_TEST_RESULTS_BUTTON_GO_TO_TEST_RESULTS)}
        </Button>
      }
    />
  );
};

export default PatientTestResultsModal;
