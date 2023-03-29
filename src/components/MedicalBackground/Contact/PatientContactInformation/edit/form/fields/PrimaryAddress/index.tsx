import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ConsultationTitleWithIcon } from '@components/MedicalBackground/components/common';
import MedicalBackgroundNote from '@components/MedicalBackground/components/common/MedicalBackgroundNote';
import AddAddressManually from '@components/MedicalBackground/Contact/PatientContactInformation/edit/form/actions/AddAddressManually';
import { ContactInformationFormFields } from '@components/MedicalBackground/Contact/PatientContactInformation/edit/types';
import { getFullAddress } from '@components/MedicalBackground/helpers';
import { ManuallyAddressModalMode } from '@components/Modals/MedicalBackground/AddAddressManually/helpers';
import { Grid, Typography } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';

import StreetAddress from './fields/StreetAddress';
import UnitNumber from './fields/UnitNumber';

const FieldPrimaryAddress = () => {
  const [t] = useTranslation();
  const contactInformation = useAppSelector(patientsSelector.contactInformation);
  const primaryAddress = contactInformation?.primaryAddress;
  const fullAddress = getFullAddress(primaryAddress);
  const [showAdditionalNote, setShowAdditionalNote] = useState(false);
  const onNoteClick = () => {
    setShowAdditionalNote(!showAdditionalNote);
  };

  return (
    <Grid px={paddings.leftRight24} py={paddings.topBottom12} xs={12} gap={4} container item direction="column">
      <Grid
        item
        container
        direction="row"
        alignItems="flex-start"
        sx={{
          marginTop: margins.top10
        }}
        xs={12}
      >
        <Grid item container xs={5} direction="row" alignItems="flex-start" flexWrap="nowrap" gap={2}>
          <ConsultationTitleWithIcon
            onClick={onNoteClick}
            description={t(
              Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_INFORMATION_PATIENT_PRIMARY_ADDRESS
            )}
          />
        </Grid>
        <Grid item container direction="column" gap={2} xs={7}>
          {primaryAddress?.isEditable ? (
            <>
              <StreetAddress />
              <UnitNumber />
              <AddAddressManually actionType={ManuallyAddressModalMode.Primary} />
            </>
          ) : (
            <Typography>{fullAddress}</Typography>
          )}
          <MedicalBackgroundNote
            onClick={onNoteClick}
            visible={showAdditionalNote}
            fieldName={ContactInformationFormFields.PrimaryAddress}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FieldPrimaryAddress;
