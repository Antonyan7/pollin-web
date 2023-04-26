import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Recency } from '@axios/patientEmr/managerPatientEmrTypes';
import { Button, Grid, useTheme } from '@mui/material';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { dispatch, useAppSelector } from 'redux/hooks';
import { paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import CurrentMedications from './MedicationList/CurrentMedications';
import PastMedications from './MedicationList/PastMedications';

const Medications = () => {
  const [t] = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const patientId = router.query.id as string;

  const patientCurrentMedications = useAppSelector(patientsSelector.patientCurrentMedications);
  const patientPastMedications = useAppSelector(patientsSelector.patientPastMedications);
  const isPatientCurrentMedicationLoading = useAppSelector(patientsSelector.isPatientCurrentMedicationLoading);
  const isPatientPastMedicationLoading = useAppSelector(patientsSelector.isPatientPastMedicationLoading);

  useEffect(() => {
    if (patientId) {
      dispatch(patientsMiddleware.getPatientMedications(patientId, Recency.Current, 1));
      dispatch(patientsMiddleware.getPatientMedications(patientId, Recency.Past, 1));
    }

    dispatch(patientsMiddleware.updateCardToViewMode(-1, []));
    dispatch(patientsMiddleware.updateCardToEditMode(-1, []));
    dispatch(patientsMiddleware.isMedicationFieldsDirty(false));
  }, [patientId]);

  const handleOnClick = () => {
    dispatch(viewsMiddleware.openModal({ name: ModalName.AddPatientMedicationModal, props: null }));
  };
  const emptyState =
    !patientCurrentMedications?.medications?.length &&
    !patientPastMedications?.medications?.length &&
    !isPatientPastMedicationLoading &&
    !isPatientCurrentMedicationLoading;

  return (
    <>
      <Grid item container justifyContent="flex-end">
        <Button color="primary" variant="contained" sx={{ p: paddings.all12 }} onClick={handleOnClick}>
          {t(Translation.PAGE_MEDICATIONS_ADD_BUTTON)}
        </Button>
      </Grid>

      {emptyState ? (
        <Grid container justifyContent="center" alignItems="center" spacing={2} direction="column">
          <Grid
            item
            sx={{ fontSize: theme.typography.pxToRem(15), color: theme.palette.common.black, fontWeight: 500 }}
          >
            {t(Translation.PAGE_MEDICATIONS_EMPTY_LIST)}
          </Grid>
          <Grid item>
            <Button sx={{ border: `1px solid ${theme.palette.primary.main}` }} onClick={handleOnClick}>
              {t(Translation.PAGE_MEDICATIONS_ADD_BUTTON)}
            </Button>
          </Grid>
        </Grid>
      ) : null}
      {patientCurrentMedications?.medications?.length || patientPastMedications?.medications?.length ? (
        <>
          <CurrentMedications />
          <PastMedications />
        </>
      ) : null}
    </>
  );
};

export default Medications;
