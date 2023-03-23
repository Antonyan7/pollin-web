import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { Translation } from 'constants/translations';
import { IPatientInfo } from 'types/reduxTypes/bookingStateTypes';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

const DisabledPatientId = ({ patient }: { patient: IPatientInfo | {} }) => {
  const [t] = useTranslation();

  const patientIdFieldName = 'patientId';

  const patientIdSelectLabel = t(Translation.MODAL_APPOINTMENTS_EDIT_SELECT_PATIENT);

  return (
    <Grid item xs={12}>
      <BaseDropdownWithLoading
        isLoading={false}
        id={patientIdFieldName}
        disabled
        defaultValue={patient}
        options={[patient]}
        getOptionLabel={(option) => (option as IPatientInfo).name}
        renderInputProps={{
          label: patientIdSelectLabel
        }}
      />
    </Grid>
  );
};

export default DisabledPatientId;
