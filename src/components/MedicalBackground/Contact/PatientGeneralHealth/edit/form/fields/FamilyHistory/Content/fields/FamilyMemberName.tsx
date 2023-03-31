import React, { useRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  DiagramTitleProps,
  familyMemberTypes,
  GeneralHealthFormFields
} from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import useScrollIntoView from '@components/MedicalBackground/hooks/useScrollIntoView';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FormControl, FormHelperText, Grid, MenuItem } from '@mui/material';
import { Translation } from 'constants/translations';
import { generateErrorMessage } from 'helpers/generateErrorMessage';
import { borders } from 'themes/themeConstants';

import { BaseSelectWithLoading } from '@ui-component/BaseDropdownWithLoading';

const FamilyMemberName = ({ titleIndex }: DiagramTitleProps) => {
  const [t] = useTranslation();
  const familyMemberRef = useRef<HTMLInputElement>(null);
  const { control } = useFormContext();
  const label = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_FAMILY_HISTORY_PROBLEM_FAMILY_MEMBER);
  const { field, fieldState } = useController({
    name: `${GeneralHealthFormFields.FamilyHistory}.items.${titleIndex}.familyMemberName`,
    control
  });
  const errorHelperText = generateErrorMessage(`${label} ${titleIndex + 1}`);
  const isErrorExists = Boolean(fieldState?.error);
  const shouldBeHighlited = field.value === '' && isErrorExists;

  useScrollIntoView(familyMemberRef, fieldState);

  return (
    <Grid item xs={6}>
      <FormControl fullWidth error={shouldBeHighlited}>
        <BaseSelectWithLoading
          MenuProps={{
            style: { maxHeight: 260 },
            PaperProps: {
              style: { border: `${borders.solid2px}` }
            }
          }}
          IconComponent={KeyboardArrowDownIcon}
          label={label}
          id="family-member-name-label"
          labelId="family-member-name-label"
          {...field}
          value={field.value}
          error={isErrorExists}
        >
          {familyMemberTypes.map((memberType) => (
            <MenuItem value={memberType} key={memberType.toString()}>
              {memberType}
            </MenuItem>
          ))}
        </BaseSelectWithLoading>
        {shouldBeHighlited ? (
          <FormHelperText
            sx={{
              color: (theme) => theme.palette.error.main
            }}
          >
            {errorHelperText}
          </FormHelperText>
        ) : null}
      </FormControl>
    </Grid>
  );
};

export default FamilyMemberName;
