import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { Translation } from 'constants/translations';
import { useAppSelector } from 'redux/hooks';
import { patientsSelector } from 'redux/slices/patients';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

const PatientName = () => {
  const [t] = useTranslation();
  const patientProfile = useAppSelector(patientsSelector.patientProfile);
  const patientIdSelectLabel = t(Translation.MODAL_PATIENT_APPOINTMENTS_PATIENT_NAME);

  return (
    <Grid item xs={12}>
      <BaseDropdownWithLoading
        isLoading={!!patientProfile}
        id="readOnly"
        readOnly
        freeSolo
        options={[]}
        defaultValue={patientProfile?.title}
        value={patientProfile?.title}
        renderInputProps={{
          label: patientIdSelectLabel
        }}
      />
    </Grid>
  );
};

export default PatientName;
