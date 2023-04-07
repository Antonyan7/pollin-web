import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import Diagram from '@components/MedicalBackground/components/common/Diagram';
import { DialogActions, DialogContent, Grid } from '@mui/material';
import { margins, paddings } from 'themes/themeConstants';

import CurrentMedicationsAndDrugAllergies from '../CurrentMedicationsAndDrugAllergies';

import AddMedication from './actions/AddMedication';
import DisabledPatientId from './fields/DisabledPatient';
import PrescriberDetails from './fields/PrescriberDetails';
import PrescriptionType from './fields/PrescriptionType';
import useMedicationsContext from './hooks/useMedicationsContext';
import MedicationTitle from './MedicationCard/MedicationTitle';
import ConfirmButton from './actions';
import { PrescriptionTypeEnum } from './initialValues';
import MedicationCard from './MedicationCard';
import PharmacyAddress from './PharmacyAddress';

const FormBody = () => {
  const { fields: medications } = useMedicationsContext();
  const { control } = useFormContext();
  const { field } = useController({
    name: 'type',
    control
  });
  const showPharmacyInformation = field.value === PrescriptionTypeEnum.External;

  return (
    <DialogContent sx={{ padding: `${paddings.top32} ${paddings.right32} ${paddings.bottom24} ${paddings.left32}` }}>
      <Grid container>
        <Grid item xs={8}>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            sx={{ maxHeight: '600px', overflowY: 'scroll', pr: paddings.leftRight16 }}
          >
            <DisabledPatientId />
            <PrescriptionType />
            <PrescriberDetails />
            {showPharmacyInformation ? <PharmacyAddress /> : null}
            <Grid item>
              {medications.map((medication, medicationIndex) => (
                <Diagram
                  titleComponent={<MedicationTitle titleIndex={medicationIndex} />}
                  titleContent={medication}
                  key={medication.id}
                >
                  <MedicationCard index={medicationIndex} />
                </Diagram>
              ))}
              <AddMedication />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={0.5} />
        <Grid item xs={3.5}>
          <CurrentMedicationsAndDrugAllergies />
        </Grid>
      </Grid>

      <DialogActions sx={{ p: paddings.all4, marginTop: margins.top4 }}>
        <Grid container justifyContent="flex-end" alignItems="center">
          <ConfirmButton />
        </Grid>
      </DialogActions>
    </DialogContent>
  );
};

export default FormBody;
