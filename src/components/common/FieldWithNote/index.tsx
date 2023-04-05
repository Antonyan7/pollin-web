import React, { PropsWithChildren, useCallback, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { DeleteTwoTone } from '@mui/icons-material';
import { Grid, IconButton, TextField, Typography } from '@mui/material';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';

import MedicalBackgroundNoteIcon from '@assets/icons/MedicalBackgroundNote';

import { ConsultationFormSubTitle } from '../../MedicalBackground/components/common';

interface NoteProps {
  fieldName: string;
  visible: boolean;
  onClick: () => void;
}

const Note = ({ fieldName, visible, onClick }: NoteProps) => {
  const [t] = useTranslation();
  const { control } = useFormContext();
  const { field } = useController({ name: `${fieldName}.note`, control });

  const onDeleteIconClick = () => {
    onClick();
    field.onChange('');
  };

  return visible || field.value ? (
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
      <DeleteTwoTone
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

export const FieldLabelWithNoteIcon = ({
  description,
  onClick,
  isShown,
  fieldName
}: {
  description: string;
  onClick?: () => void;
  isShown?: boolean;
  fieldName: string;
}) => {
  const { control } = useFormContext();
  const { field } = useController({ name: `${fieldName}.note`, control });

  return (
    <Grid item container direction="row" alignItems="center" xs={12}>
      <Grid item container direction="row" alignItems="center" gap={2} xs={10}>
        <ConsultationFormSubTitle>{description}</ConsultationFormSubTitle>
        <IconButton
          {...(isShown || field.value
            ? {
                sx: {
                  '& svg': {
                    opacity: '40%'
                  }
                }
              }
            : {
                onClick
              })}
          disableRipple
          disableTouchRipple
        >
          <MedicalBackgroundNoteIcon />
        </IconButton>
      </Grid>
      <Grid item xs={2}>
        <Typography>:</Typography>
      </Grid>
    </Grid>
  );
};

interface FieldWithNoteProps extends PropsWithChildren {
  fieldLabel: string;
  fieldName: string;
  fieldComponent: React.ReactElement;
}

const FieldWithNote = ({ fieldLabel, fieldName, children, fieldComponent }: FieldWithNoteProps) => {
  const { control } = useFormContext();
  const { field } = useController({ name: `${fieldName}.note`, control });
  const [shouldShowNote, setShouldShowNote] = useState(!!field.value);
  const onNoteClick = useCallback(() => {
    setShouldShowNote((isShown) => !isShown);
  }, []);

  return (
    <Grid container item px={paddings.leftRight32} py={paddings.topBottom16} direction="row" xs={12}>
      <Grid
        item
        container
        direction="row"
        xs={5}
        alignItems="flex-start"
        flexWrap="nowrap"
        gap={1}
        sx={{
          marginTop: margins.top10
        }}
      >
        <FieldLabelWithNoteIcon
          description={fieldLabel}
          onClick={onNoteClick}
          isShown={shouldShowNote}
          fieldName={fieldName}
        />
      </Grid>
      <Grid item container direction="column" xs={7} gap={2}>
        {fieldComponent}
        {children}
        <Note onClick={onNoteClick} visible={shouldShowNote ?? false} fieldName={fieldName} />
      </Grid>
    </Grid>
  );
};

export default FieldWithNote;
