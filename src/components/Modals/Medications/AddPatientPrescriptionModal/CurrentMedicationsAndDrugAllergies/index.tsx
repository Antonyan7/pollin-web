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
        {!patientMedicationState?.currentMedications.length && '-'}
        {patientMedicationState?.currentMedications.map((item, index) => {
          const currentMedicationName = ` ${index + 1}. ${item.name}`;

          // TODO better key that a value TEAMA-5498
          return <Typography key={currentMedicationName}>{currentMedicationName}</Typography>;
        })}
      </Grid>

      <Grid item>
        <Typography variant="h5">{t(Translation.MODAL_PRESCRIPTIONS_DRUG_ALLERGIES)}</Typography>
        {!patientMedicationState?.drugAllergies.length && '-'}
        {patientMedicationState?.drugAllergies.map((item, index) => {
          const drugAllergiesName = ` ${index + 1}. ${item.name}`;

          // TODO better key that a value TEAMA-5498
          return <Typography key={drugAllergiesName}>{drugAllergiesName.length ? drugAllergiesName : '-'}</Typography>;
        })}
      </Grid>

      <Grid item>
        <Typography variant="h5">{t(Translation.MODAL_PRESCRIPTIONS_NEW_PRESCRIPTION_MEDICATION_LIST)}</Typography>
        {!prescriptionList?.length && '1.'}
        {prescriptionList?.map((prescriptionItem, prescriptionItemIndex) => {
          const name = `${prescriptionItemIndex + 1}. ${prescriptionItem.name}`;

          // TODO better key that a value TEAMA-5498
          return <Grid key={name}>{name}</Grid>;
        })}
      </Grid>
    </Grid>
  );
};

export default CurrentMedicationsAndDrugAllergies;
