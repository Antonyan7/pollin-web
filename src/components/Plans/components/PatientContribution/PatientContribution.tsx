import React from 'react';
import { useTranslation } from 'react-i18next';
import { ConsultationDivider, ConsultationFormTitle, ConsultationTitleWithIcon } from '@components/common';
import PatientContributionWrapper from '@components/Plans/components/PatientContribution/PatientContributionWrapper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Grid } from '@mui/material';
import { Translation } from 'constants/translations';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

const PatientContribution = () => {
  const [t] = useTranslation();
  const primaryContributionLabel = t(Translation.PAGE_PATIENT_PLANS_PRIMARY_PATIENT_CONTRIBUTION);

  return (
    <PatientContributionWrapper>
      <Grid>
        <ConsultationFormTitle>{t(Translation.PAGE_PATIENT_PLANS_PATIENT_CONTRIBUTION)}</ConsultationFormTitle>
      </Grid>
      <Grid item container direction="row" alignItems="center" xs={12}>
        <Grid item container xs={4} direction="row" alignItems="center" flexWrap="nowrap" gap={2}>
          <ConsultationTitleWithIcon description={primaryContributionLabel} />
        </Grid>
        <Grid item xs={8}>
          <BaseDropdownWithLoading
            isLoading={false}
            options={[]}
            popupIcon={<KeyboardArrowDownIcon />}
            renderInputProps={{
              label: primaryContributionLabel
            }}
          />
        </Grid>
      </Grid>
      <ConsultationDivider />
    </PatientContributionWrapper>
  );
};

export default PatientContribution;
