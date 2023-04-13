import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/system';
import { Translation } from 'constants/translations';
import { borderRadius, borders } from 'themes/themeConstants';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

import { AddPatientMedicationFormField } from '../initialValues';

const DrugNameField = ({ drugName }: { drugName?: string }) => {
  const [t] = useTranslation();
  const labelFieldName = AddPatientMedicationFormField.MedicationName;
  const assignLabel = t(Translation.MODAL_ADD_PATIENT_MEDICATION_DRUG_NAME);
  const theme = useTheme();

  return (
    <Grid item xs={12}>
      <BaseDropdownWithLoading
        inputValue={drugName}
        isLoading={false}
        ListboxProps={{
          style: {
            maxHeight: 220,
            borderRadius: `${borderRadius.radius8}`,
            border: `${borders.solid2px} ${theme.palette.primary.main}`
          }
        }}
        options={[]}
        disabled
        renderInputProps={{
          label: assignLabel,
          name: labelFieldName
        }}
      />
    </Grid>
  );
};

export default DrugNameField;
