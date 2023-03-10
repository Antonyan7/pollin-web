import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSamePrimaryContext } from '@components/MedicalBackground/Contact/PatientContactInformation/edit/hooks/useSamePrimaryContext';
import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import { Translation } from 'constants/translations';

const SameAsPrimary = () => {
  const { isSameAddressChecked, setSameAddress } = useSamePrimaryContext();
  const [t] = useTranslation();

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={isSameAddressChecked}
          onChange={(event) => {
            setSameAddress?.(event.target.checked);
          }}
          sx={{
            color: (theme) => theme.palette.primary.main,
            '& .MuiSvgIcon-root': { fontSize: 28 }
          }}
        />
      }
      label={
        <Typography
          sx={{
            color: (theme) => theme.palette.secondary[800]
          }}
        >
          {t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_INFORMATION_PATIENT_ADDRESS_SAME_AS)}
        </Typography>
      }
    />
  );
};

export default SameAsPrimary;
