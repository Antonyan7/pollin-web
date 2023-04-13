import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Recency } from '@axios/patientEmr/managerPatientEmrTypes';
import { Box, Grid, TablePagination, Typography } from '@mui/material';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { dispatch, useAppSelector } from 'redux/hooks';
import { margins, paddings } from 'themes/themeConstants';
import { v4 } from 'uuid';

import CircularLoading from '@ui-component/circular-loading';

import CardItem from '../Card';

const CurrentMedications = () => {
  const [t] = useTranslation();
  const [page, setPage] = useState<number>(0);
  const router = useRouter();
  const patientId = router.query.id as string;

  useEffect(() => {
    dispatch(patientsMiddleware.getMedicationDropdownOptions());
  }, []);

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (patientId) {
      dispatch(patientsMiddleware.getPatientMedications(patientId, Recency.Current, page + 1));
    }
  }, [page, patientId]);

  const patientCurrentMedications = useAppSelector(patientsSelector.patientCurrentMedications);
  const isPatientCurrentMedicationLoading = useAppSelector(patientsSelector.isPatientCurrentMedicationLoading);

  return (
    <>
      <Typography variant="h3" p={paddings.all12}>
        {t(Translation.PAGE_MEDICATIONS_CURRENT_LIST_TITLE)}
      </Typography>
      {isPatientCurrentMedicationLoading ? (
        <Box display="flex" justifyContent="center" py={paddings.topBottom24}>
          <CircularLoading />
        </Box>
      ) : (
        patientCurrentMedications?.medications?.map((medication, index) => (
          <CardItem key={v4()} index={index} medication={medication} />
        ))
      )}
      {!patientCurrentMedications?.medications?.length && !isPatientCurrentMedicationLoading ? (
        <Grid container justifyContent="center" sx={{ fontSize: '15px', margin: margins.all12 }}>
          {t(Translation.PAGE_MEDICATIONS_CURRENT_EMPTY_LIST)}
        </Grid>
      ) : null}

      <Grid item xs={12}>
        <TablePagination
          labelRowsPerPage={`${t(Translation.COMMON_PAGINATION_ROWS_COUNT)} :`}
          component="div"
          count={patientCurrentMedications.totalItems}
          rowsPerPage={patientCurrentMedications.pageSize}
          page={page}
          onPageChange={handleChangePage}
        />
      </Grid>
    </>
  );
};

export default CurrentMedications;
