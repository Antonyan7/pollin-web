import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ConsultationDivider,
  ConsultationFormSubTitle,
  ConsultationFormTitle,
  ConsultationTitleWithIcon
} from '@components/Plans/components/common';
import ConsultationFormRadio from '@components/Plans/components/ConslutationFormRadio/ConsultationFormRadio';
import PartnerContent from '@components/Plans/components/PatientDetails/PartnerContent';
import PartnerFormHeader from '@components/Plans/components/PatientDetails/PartnerHeader';
import { getPatientDetailsValues, maximumAmoutOfPartners } from '@components/Plans/helpers';
import { InitialConsultationFormRadioValues } from '@components/Plans/types';
import AddIcon from '@mui/icons-material/Add';
import { Button, Grid, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';

import SubCardStyled from '@ui-component/cards/SubCardStyled';

const PatientDetails = () => {
  const [t] = useTranslation();
  const theme = useTheme();
  const [radioContolValue, setRadioValue] = useState(InitialConsultationFormRadioValues.Yes);
  const partnerInitialValue = [getPatientDetailsValues()];
  const [partnerInvitations, setPartnerInvitations] = useState(partnerInitialValue);

  const onRadioFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = event.target.value as InitialConsultationFormRadioValues;

    setRadioValue(targetValue);
  };

  const partnerInvitation = () => {
    if (partnerInvitations.length >= maximumAmoutOfPartners) {
      return;
    }

    setPartnerInvitations((partnerState) => [...partnerState, getPatientDetailsValues()]);
  };

  return (
    <Grid item container xs={12} direction="column" gap={4}>
      <Grid item container px={paddings.leftRight32}>
        <ConsultationFormTitle>
          {t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_PARTNER_DETAILS)}
        </ConsultationFormTitle>
      </Grid>
      <Grid container item px={paddings.leftRight32} py={paddings.topBottom16} direction="row" xs={12}>
        <Grid
          item
          container
          direction="row"
          xs={4}
          alignItems="flex-start"
          flexWrap="nowrap"
          gap={1}
          sx={{
            marginTop: margins.top10
          }}
        >
          <ConsultationTitleWithIcon
            description={t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_PARTNER_JOURNEY_QUESTION)}
          />
        </Grid>
        <Grid item container direction="column" xs={8} gap={2}>
          <Grid>
            <ConsultationFormRadio value={radioContolValue} onChange={onRadioFieldChange} fieldName="JourneyInvolved" />
          </Grid>
          <Grid>
            <ConsultationFormSubTitle>
              {t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_PARTNER_ACCEPTED)}
            </ConsultationFormSubTitle>
            {partnerInvitations.map((partner, partnerIndex) => (
              <SubCardStyled
                key={partner.id}
                title={
                  <PartnerFormHeader
                    title={`${t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_PARTNER)} ${partnerIndex + 1}`}
                  />
                }
                sx={{
                  backgroundColor: theme.palette.primary.light,
                  marginTop: margins.top10
                }}
              >
                <PartnerContent />
              </SubCardStyled>
            ))}
          </Grid>
          <Grid item container alignItems="center" justifyContent="center">
            <Button onClick={partnerInvitation} disabled={partnerInvitations.length >= 4}>
              <AddIcon sx={{ color: theme.palette.primary.main }} />
              <ConsultationFormSubTitle
                sx={{
                  color: theme.palette.primary.main,
                  marginLeft: margins.left8
                }}
              >
                {t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_PARTNER_INVITE)}
              </ConsultationFormSubTitle>
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <ConsultationDivider />
    </Grid>
  );
};

export default PatientDetails;
