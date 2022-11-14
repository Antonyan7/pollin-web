import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Checkbox, FormControlLabel, FormGroup, Grid, Typography } from '@mui/material';
import { Translation } from 'constants/translations';
import { usePatientInfoContext } from 'context/PatientInformationContext';
import { PatientInformationContextActionTypes } from 'context/types/PatientInformationContextTypes';

const CheckboxConfirming = () => {
  const [t] = useTranslation();

  const [patientNameChecked, setPatientNameChecked] = useState<boolean>(false);
  const [patientIdChecked, setPatientIdChecked] = useState<boolean>(false);
  const [OHIPInformationChecked, setOfipInformationChecked] = useState<boolean>(false);
  const { setPatientInfo } = usePatientInfoContext();

  useEffect(() => {
    if (patientNameChecked && patientIdChecked && OHIPInformationChecked) {
      setPatientInfo({ type: PatientInformationContextActionTypes.UPDATE_IS_PATIENT_INFO_CONFIRMED, status: true });
    } else {
      setPatientInfo({ type: PatientInformationContextActionTypes.UPDATE_IS_PATIENT_INFO_CONFIRMED, status: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientNameChecked, patientIdChecked, OHIPInformationChecked]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="bold">
            {t(Translation.MODAL_EXTERNAL_RESULTS_CONFIRM_DETAILS)}
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={patientNameChecked}
                  onChange={(event) => {
                    setPatientNameChecked(event.target.checked);
                  }}
                />
              }
              label={t(Translation.MODAL_EXTERNAL_RESULTS_PATIENT_NAME)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={patientIdChecked}
                  onChange={(event) => {
                    setPatientIdChecked(event.target.checked);
                  }}
                />
              }
              label={t(Translation.MODAL_EXTERNAL_RESULTS_PATIENT_ID)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={OHIPInformationChecked}
                  onChange={(event) => {
                    setOfipInformationChecked(event.target.checked);
                  }}
                />
              }
              label={t(Translation.MODAL_EXTERNAL_RESULTS_OHIP_INFORMATION)}
            />
          </FormGroup>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckboxConfirming;
