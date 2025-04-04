import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Box, Checkbox, FormControlLabel, FormGroup, Grid, Typography } from '@mui/material';
import { patientsSelector } from '@redux/slices/patients';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { usePatientInfoContext } from 'context/PatientInformationContext';
import { PatientInformationContextActionTypes } from 'context/types/PatientInformationContextTypes';
import { ContactInformationResultsPossibleResponses } from 'types/results';

const CheckboxConfirming = () => {
  const [t] = useTranslation();
  const patientContactInformation = useSelector(patientsSelector.patientContactInformation);

  const [patientNameChecked, setPatientNameChecked] = useState<boolean>(false);
  const [patientIdChecked, setPatientIdChecked] = useState<boolean>(false);
  const [OHIPInformationChecked, setOfipInformationChecked] = useState<boolean>(false);
  const { setPatientInfo } = usePatientInfoContext();

  const arePatientCheckboxesConfirmed = () => {
    if (patientContactInformation.ohipNumber !== ContactInformationResultsPossibleResponses.Unknown) {
      return patientNameChecked && patientIdChecked && OHIPInformationChecked;
    }

    return patientNameChecked && patientIdChecked;
  };

  useEffect(() => {
    if (arePatientCheckboxesConfirmed()) {
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
          <Typography variant="subtitle1" fontWeight={500}>
            {t(Translation.MODAL_EXTERNAL_RESULTS_CONFIRM_DETAILS)}
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={patientNameChecked}
                  data-cy={CypressIds.PAGE_SPECIMEN_COLLECTION_MODAL_COLLECT_PATIENT_NAME_CHECKBOX}
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
                  data-cy={CypressIds.PAGE_SPECIMEN_COLLECTION_MODAL_COLLECT_PATIENT_DATE_CHECKBOX}
                  checked={patientIdChecked}
                  onChange={(event) => {
                    setPatientIdChecked(event.target.checked);
                  }}
                />
              }
              label={t(Translation.MODAL_EXTERNAL_RESULTS_PATIENT_DATE_OF_BIRTH)}
            />
            {patientContactInformation.ohipNumber !== ContactInformationResultsPossibleResponses.Unknown &&
              patientContactInformation.ohipVersionCode !== ContactInformationResultsPossibleResponses.Unknown && (
                <FormControlLabel
                  control={
                    <Checkbox
                      data-cy={CypressIds.PAGE_SPECIMEN_COLLECTION_MODAL_COLLECT_PATIENT_OHIP_CHECKBOX}
                      checked={OHIPInformationChecked}
                      onChange={(event) => {
                        setOfipInformationChecked(event.target.checked);
                      }}
                    />
                  }
                  label={t(Translation.MODAL_EXTERNAL_RESULTS_OHIP_INFORMATION)}
                />
              )}
          </FormGroup>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckboxConfirming;
