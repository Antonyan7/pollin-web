import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MedicationCardType } from '@axios/patientEmr/managerPatientEmrTypes';
import { Box, Grid, TablePagination } from '@mui/material';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { dispatch, useAppSelector } from 'redux/hooks';
import { margins, paddings } from 'themes/themeConstants';
import { v4 } from 'uuid';

import CircularLoading from '@ui-component/circular-loading';
import MedicationCard from '@ui-component/medications/MedicationCard';

const PrescriptionsList = () => {
  const [t] = useTranslation();
  const [page, setPage] = useState<number>(0);
  const router = useRouter();
  const patientId = router.query.id as string;

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const isPatientPrescriptionsLoading = useAppSelector(patientsSelector.isPatientPrescriptionsLoading);
  const patientPrescriptions = useAppSelector(patientsSelector.patientPrescriptions);

  useEffect(() => {
    if (patientId) {
      dispatch(patientsMiddleware.getPatientPrescriptions(patientId, 1));
    }
  }, [patientId]);

  useEffect(() => {
    dispatch(patientsMiddleware.getPrescriptionStatuses());
  }, []);

  useEffect(() => {
    dispatch(patientsMiddleware.getPatientPrescriptions(patientId, page + 1));
  }, [page, patientId]);

  return (
    <>
      {isPatientPrescriptionsLoading ? (
        <Box display="flex" justifyContent="center" py={paddings.topBottom24}>
          <CircularLoading />
        </Box>
      ) : (
        patientPrescriptions?.prescriptions?.map((prescription) => (
          <MedicationCard key={v4()} data={prescription} cardType={MedicationCardType.Prescription} />
        ))
      )}
      {!patientPrescriptions?.prescriptions?.length && !isPatientPrescriptionsLoading ? (
        <Grid container justifyContent="center" sx={{ fontSize: '15px', margin: margins.all12 }}>
          {t(Translation.PAGE_PRESCRIPTIONS_EMPTY_LIST)}
        </Grid>
      ) : null}

      <Grid item xs={12}>
        <TablePagination
          labelRowsPerPage={`${t(Translation.COMMON_PAGINATION_ROWS_COUNT)} :`}
          component="div"
          count={patientPrescriptions.totalItems}
          rowsPerPage={patientPrescriptions.pageSize}
          page={page > 0 ? page : 0}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[patientPrescriptions.pageSize, 5]}
        />
      </Grid>
    </>
  );
};

export default PrescriptionsList;
