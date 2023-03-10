import React from 'react';
import { useTranslation } from 'react-i18next';
import { ConsultationTitleWithIcon } from '@components/MedicalBackground/components/common';
import AddAddressManually from '@components/MedicalBackground/Contact/PatientContactInformation/edit/form/actions/AddAddressManually';
import { getFullAddress } from '@components/MedicalBackground/helpers';
import { ManuallyAddressModalMode } from '@components/Modals/MedicalBackground/AddAddressManually/helpers';
import { Grid, Typography } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';

import SameAsPrimary from './fields/SameAsPrimary';
import StreetAddress from './fields/StreetAddress';
import UnitNumber from './fields/UnitNumber';

const FieldMailingAddress = () => {
  const [t] = useTranslation();
  const contactInformation = useAppSelector(patientsSelector.contactInformation);
  const mailingAddress = contactInformation?.mailingAddress;
  const fullAddress = getFullAddress(mailingAddress);

  return (
    <Grid px={paddings.leftRight24} py={paddings.topBottom12} xs={12} gap={4} container item direction="column">
      <Grid item container direction="row" alignItems="flex-start" xs={12}>
        <Grid
          sx={{
            marginTop: margins.top10
          }}
          item
          container
          xs={5}
          direction="row"
          alignItems="flex-start"
          flexWrap="nowrap"
          gap={2}
        >
          <ConsultationTitleWithIcon
            description={t(
              Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_INFORMATION_PATIENT_MAILING_ADDRESS
            )}
          />
        </Grid>
        <Grid item container direction="column" gap={2} xs={7}>
          {mailingAddress?.isEditable ? (
            <>
              <SameAsPrimary />
              <StreetAddress />
              <UnitNumber />
              <AddAddressManually actionType={ManuallyAddressModalMode.Mailing} />
            </>
          ) : (
            <Typography>{fullAddress}</Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FieldMailingAddress;
