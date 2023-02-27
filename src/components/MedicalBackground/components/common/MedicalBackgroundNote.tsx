import React, { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';

interface MedicalBackgroundNoteProps {
  fieldName: string;
  visible: boolean;
}

const MedicalBackgroundNote = ({ fieldName, visible }: MedicalBackgroundNoteProps) => {
  const [t] = useTranslation();
  const [showNote, setShowNote] = useState(true);
  const { control, setValue } = useFormContext();
  const { field } = useController({ name: `${fieldName}.note`, control });
  const onDeleteIconClick = () => {
    setShowNote(!showNote);
    setValue(`${fieldName}.note`, '');
  };

  return visible && showNote ? (
    <Grid item container direction="row" alignItems="center" gap={4}>
      <TextField
        color="primary"
        sx={{
          width: '90%'
        }}
        multiline
        rows={2}
        label={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_ADDITIONAL_NOTES)}
        {...field}
        value={field.value}
        ref={field.ref}
      />
      <DeleteOutlineIcon
        onClick={onDeleteIconClick}
        sx={{
          color: (theme) => theme.palette.primary.main,
          '&:hover': {
            cursor: 'pointer'
          }
        }}
      />
    </Grid>
  ) : null;
};

export default MedicalBackgroundNote;
