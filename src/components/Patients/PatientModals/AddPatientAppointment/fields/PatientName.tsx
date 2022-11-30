import React, { useEffect, useState } from 'react';
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
  const [isPatientNameLoading, setIsPatientNameLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isPatientNameLoading) {
      setIsPatientNameLoading(true);
    }
  }, [isPatientNameLoading]);

  return (
    <Grid item xs={12}>
      <BaseDropdownWithLoading
        isLoading={isPatientNameLoading}
        id="patient-name-read-only"
        readOnly
        options={[]}
        disabled
        inputValue={patientProfile?.title}
        renderInputProps={{
          label: patientIdSelectLabel,
          name: patientIdSelectLabel
        }}
      />
    </Grid>
  );
};

export default PatientName;
