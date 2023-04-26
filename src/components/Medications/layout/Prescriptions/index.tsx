import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Grid, useTheme } from '@mui/material';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { dispatch, useAppSelector } from 'redux/hooks';
import { paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import PrescriptionsList from './PrescriptionsList';

const PrescriptionTabs = () => {
  const [t] = useTranslation();
  const router = useRouter();
  const patientId = router.query.id as string;
  const theme = useTheme();

  useEffect(() => {
    if (patientId) {
      dispatch(patientsMiddleware.getPatientPrescriptions(patientId, 1));
    }
  }, [patientId]);

  const patientPrescriptions = useAppSelector(patientsSelector.patientPrescriptions);
  const isPatientPrescriptionsLoading = useAppSelector(patientsSelector.isPatientPrescriptionsLoading);

  const handleOnClick = () => {
    dispatch(viewsMiddleware.openModal({ name: ModalName.AddPatientPrescriptionModal, props: null }));
  };

  return (
    <>
      <Grid item container justifyContent="flex-end">
        <Button color="primary" variant="contained" sx={{ p: paddings.all12 }} onClick={handleOnClick}>
          {t(Translation.PAGE_PRESCRIPTIONS_ADD_BUTTON)}
        </Button>
      </Grid>
      {!patientPrescriptions.prescriptions.length && !isPatientPrescriptionsLoading ? (
        <Grid container justifyContent="center" alignItems="center" spacing={2} direction="column">
          <Grid
            item
            sx={{ fontSize: theme.typography.pxToRem(15), color: theme.palette.common.black, fontWeight: 500 }}
          >
            {t(Translation.PAGE_PRESCRIPTIONS_EMPTY_LIST)}
          </Grid>
          <Grid item>
            <Button sx={{ border: `1px solid ${theme.palette.primary.main}` }} onClick={handleOnClick}>
              {t(Translation.PAGE_PRESCRIPTIONS_ADD_BUTTON)}
            </Button>
          </Grid>
        </Grid>
      ) : null}
      {patientPrescriptions?.prescriptions?.length ? <PrescriptionsList /> : null}
    </>
  );
};

export default PrescriptionTabs;
