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

const PastMedications = () => {
  const [t] = useTranslation();
  const patientPastMedications = useAppSelector(patientsSelector.patientPastMedications);
  const isPatientPastMedicationLoading = useAppSelector(patientsSelector.isPatientPastMedicationLoading);

  const [page, setPage] = useState<number>(0);
  const router = useRouter();
  const patientId = router.query.id as string;

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    dispatch(patientsMiddleware.getPatientMedications(patientId, Recency.Past, page + 1));
  }, [page, patientId]);

  return (
    <>
      <Typography variant="h3" p={paddings.all12}>
        {t(Translation.PAGE_MEDICATIONS_PAST_LIST_TITLE)}
      </Typography>
      {isPatientPastMedicationLoading ? (
        <Box display="flex" justifyContent="center" py={paddings.topBottom24}>
          <CircularLoading />
        </Box>
      ) : (
        patientPastMedications?.medications?.map((medication) => <CardItem key={v4()} medication={medication} />)
      )}
      {!patientPastMedications?.medications?.length && !isPatientPastMedicationLoading ? (
        <Grid
          container
          justifyContent="center"
          sx={{ fontSize: (theme) => theme.typography.pxToRem(15), margin: margins.all12 }}
        >
          {t(Translation.PAGE_MEDICATIONS_PAST_EMPTY_LIST)}
        </Grid>
      ) : null}

      <Grid item xs={12}>
        <TablePagination
          labelRowsPerPage={`${t(Translation.COMMON_PAGINATION_ROWS_COUNT)} :`}
          component="div"
          count={patientPastMedications.totalItems}
          rowsPerPage={patientPastMedications.pageSize}
          page={page}
          onPageChange={handleChangePage}
        />
      </Grid>
    </>
  );
};

export default PastMedications;
