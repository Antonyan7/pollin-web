import React, { useEffect } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSamePrimaryContext } from '@components/MedicalBackground/Contact/PatientContactInformation/edit/hooks/useSamePrimaryContext';
import { ContactInformationFormFields } from '@components/MedicalBackground/Contact/PatientContactInformation/edit/types';
import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import { Translation } from 'constants/translations';

const SameAsPrimary = () => {
  const { setSameAddress } = useSamePrimaryContext();
  const { control } = useFormContext();
  const { field } = useController({
    name: `${ContactInformationFormFields.IsSameAddressChecked}`,
    control
  });
  const [t] = useTranslation();

  useEffect(() => {
    if (field.value) {
      setSameAddress?.(true);
    }
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [field.value]);

  return (
    <FormControlLabel
      control={
        <Checkbox
          {...field}
          checked={field.value}
          onChange={(event) => {
            setSameAddress?.(event.target.checked);
            field.onChange(event.target.checked);
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
