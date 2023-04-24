import React from 'react';
import { useTranslation } from 'react-i18next';
import { getFullAddressForPharmacy } from '@components/ICForm/MaleICForm/view/helpers';
import {
  MedicalFormTitleNo,
  MedicalFormTitleYes
} from '@components/MedicalBackground/components/common/MedWithItemsView';
import { Grid, Typography } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';

const RenderPharmacy = () => {
  const [t] = useTranslation();
  const pharmacy = useAppSelector(patientsSelector.icForm)?.patientBackgroundInformation.pharmacy;
  const fullAddress = getFullAddressForPharmacy(pharmacy?.address);

  return pharmacy?.exists ? (
    <>
      <MedicalFormTitleYes />
      <Grid item container direction="column" sx={{ py: paddings.topBottom8 }} gap={0.5}>
        <Typography>{pharmacy.name}</Typography>
        <Typography>{fullAddress}</Typography>
        <Typography>{`${t(
          Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_INFORMATION_PATIENT_PHONE_NUMBER
        )}: ${pharmacy.address.phoneNumber}`}</Typography>
        <Typography>{`${t(Translation.MODAL_PRESCRIPTIONS_FAX_NUMBER)}: ${pharmacy.address.faxNumber}`}</Typography>
      </Grid>
    </>
  ) : (
    <MedicalFormTitleNo />
  );
};

export default RenderPharmacy;
