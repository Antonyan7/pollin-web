import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';

interface BodyProps {
  fieldValue: string;
  setFieldValue: (val: string) => void;
  descriptionValue: string;
  setDescriptionValue: (val: string) => void;
}

const Body = ({ fieldValue, setFieldValue, descriptionValue, setDescriptionValue }: BodyProps) => {
  const [t] = useTranslation();

  return (
    <Grid container spacing={2} sx={{ maxHeight: '400px', minWidth: '500px', overflowY: 'scroll' }}>
      <Grid item xs={12}>
        <TextField
          label={t(Translation.MODAL_ADD_OR_EDIT_PATIENT_ALERT_FIELD)}
          value={fieldValue}
          fullWidth
          onChange={(e) => {
            setFieldValue(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label={t(Translation.MODAL_ADD_OR_EDIT_PATIENT_ALERT_DESCRIPTION)}
          fullWidth
          minRows={4}
          value={descriptionValue}
          onChange={(e) => {
            setDescriptionValue(e.target.value);
          }}
          multiline
        />
      </Grid>
    </Grid>
  );
};

export default Body;
