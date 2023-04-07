import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PatientPrescriptionsDrugListProps } from '@axios/patientEmr/managerPatientEmrTypes';
import { Grid, Typography } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';

const CurrentMedicationsAndDrugAllergies = () => {
  const [t] = useTranslation();
  const router = useRouter();
  const patientId = router.query.id as string;
  const [prescriptionList, setPrescriptionList] = useState<PatientPrescriptionsDrugListProps[] | null>(null);
  const prescriptionsDrugList = useAppSelector(patientsSelector.prescriptionsDrugList);

  const patientMedicationState = useAppSelector(patientsSelector.patientMedicationState);

  useEffect(() => {
    if (patientId) {
      dispatch(patientsMiddleware.getPatientMedicationsState(patientId));
    }
  }, [patientId]);

  useEffect(() => {
    if (prescriptionsDrugList?.length) {
      setPrescriptionList(prescriptionsDrugList);
    } else {
      setPrescriptionList(null);
    }
  }, [prescriptionsDrugList]);

  return (
    <Grid container spacing={3}>
      <Grid item>
        <Typography variant="h5">{t(Translation.MODAL_PRESCRIPTIONS_CURRENT_MEDICATION)}</Typography>
        {patientMedicationState?.currentMedications}
      </Grid>

      <Grid item>
        <Typography variant="h5">{t(Translation.MODAL_PRESCRIPTIONS_DRUG_ALLERGIES)}</Typography>
        {patientMedicationState?.currentMedications}
      </Grid>

      <Grid item>
        <Typography variant="h5">{t(Translation.MODAL_PRESCRIPTIONS_NEW_PRESCRIPTION_MEDICATION_LIST)}</Typography>
        {!prescriptionList?.length && '1.'}
        {prescriptionList?.map((prescriptionItem, prescriptionItemIndex) => (
          <Grid container gap={1} direction="row" xs={5}>
            <Grid xs={2.5}>{`${prescriptionItemIndex + 1}.`}</Grid>
            <Grid>{prescriptionItem.name}</Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default CurrentMedicationsAndDrugAllergies;
