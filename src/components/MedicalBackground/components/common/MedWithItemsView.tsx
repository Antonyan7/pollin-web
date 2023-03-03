import React, { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@mui/material';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';

const ItemsViewWrapper = ({ children }: PropsWithChildren) => (
  <Grid pt={paddings.top16} item container xs={12} justifyContent="flex-start" direction="column">
    {children}
  </Grid>
);

const MedicalFormTitleYes = () => {
  const [t] = useTranslation();

  return <Typography>{t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_CONSULTATION_YES)}</Typography>;
};

const MedicalFormTitleNo = () => {
  const [t] = useTranslation();

  return <Typography>{t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_CONSULTATION_NO)}</Typography>;
};

export { ItemsViewWrapper, MedicalFormTitleNo, MedicalFormTitleYes };
