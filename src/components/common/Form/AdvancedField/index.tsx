import React, { PropsWithChildren, ReactElement, useCallback, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { DeleteTwoTone } from '@mui/icons-material';
import { Grid, IconButton, styled, TextField, Typography } from '@mui/material';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';

import MedicalBackgroundNoteIcon from '@assets/icons/MedicalBackgroundNote';

const FieldSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary[800],
  fontSize: theme.typography.pxToRem(16)
}));

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
  fieldName,
  withoutSeparator
}: {
  description: ReactElement;
  onClick?: () => void;
  isShown?: boolean;
  fieldName: string;
  withoutSeparator?: boolean;
}) => {
  const { control } = useFormContext();
  const { field } = useController({ name: `${fieldName}.note`, control });

  return (
    <Grid item container direction="row" alignItems="center" xs={12}>
      <Grid item container direction="row" alignItems="center" gap={2} xs={10}>
        {description}
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
      {!withoutSeparator && (
        <Grid item xs={2}>
          <Typography>:</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export enum AdvancedFieldType {
  Plan = 'Plan',
  MedicalBackground = 'MedicalBackground'
}

interface AdvancedFieldProps extends PropsWithChildren {
  fieldLabel: string;
  fieldName: string;
  fieldComponent: React.ReactElement;
  type?: AdvancedFieldType;
}

export const FieldWithNote = ({ fieldLabel, fieldName, children, fieldComponent, type }: AdvancedFieldProps) => {
  const { control } = useFormContext();
  const { field } = useController({ name: `${fieldName}.note`, control, defaultValue: '' });
  const [shouldShowNote, setShouldShowNote] = useState(!!field.value);
  const onNoteClick = useCallback(() => {
    setShouldShowNote((isShown) => !isShown);
  }, []);

  const isPlanField = type === AdvancedFieldType.Plan;

  return (
    <Grid
      container
      item
      {...(!isPlanField
        ? {
            px: paddings.leftRight32,
            py: paddings.topBottom16
          }
        : {
            alignItems: shouldShowNote ? 'flex-start' : 'center'
          })}
      direction="row"
      xs={12}
    >
      <Grid
        item
        container
        direction="row"
        xs={isPlanField ? 6 : 5}
        alignItems="flex-start"
        flexWrap="nowrap"
        gap={1}
        sx={{
          marginTop: margins.top10
        }}
      >
        <FieldLabelWithNoteIcon
          withoutSeparator={isPlanField}
          description={
            <FieldSubtitle
              {...(isPlanField && {
                sx: {
                  fontSize: (theme) => theme.typography.pxToRem(14)
                }
              })}
            >
              {fieldLabel}
            </FieldSubtitle>
          }
          onClick={onNoteClick}
          isShown={shouldShowNote}
          fieldName={fieldName}
        />
      </Grid>
      <Grid item container direction="column" xs={isPlanField ? 6 : 7} gap={2}>
        {fieldComponent}
        {children}
        <Note onClick={onNoteClick} visible={shouldShowNote ?? false} fieldName={fieldName} />
      </Grid>
    </Grid>
  );
};

export const FieldLabel = ({
  description,
  withoutSeparator
}: {
  description: ReactElement;
  withoutSeparator?: boolean;
}) => (
  <Grid item container direction="row" alignItems="center" xs={12}>
    <Grid item container direction="row" alignItems="center" gap={2} xs={10}>
      {description}
    </Grid>
    {!withoutSeparator && (
      <Grid item xs={2}>
        <Typography>:</Typography>
      </Grid>
    )}
  </Grid>
);

export const SimpleField = ({
  fieldLabel,
  fieldComponent,
  type = AdvancedFieldType.MedicalBackground,
  children
}: Partial<AdvancedFieldProps>) => {
  const isPlanField = type === AdvancedFieldType.Plan;

  return (
    <Grid
      container
      item
      {...(!isPlanField
        ? {
            px: paddings.leftRight32,
            py: paddings.topBottom16
          }
        : {
            alignItems: children ? 'flex-start' : 'center'
          })}
      direction="row"
      xs={12}
    >
      <Grid
        item
        container
        direction="row"
        xs={isPlanField ? 6 : 5}
        alignItems="flex-start"
        flexWrap="nowrap"
        gap={1}
        sx={{
          marginTop: margins.top10
        }}
      >
        <FieldLabel
          withoutSeparator={isPlanField}
          description={
            <FieldSubtitle
              {...(isPlanField && {
                sx: {
                  fontSize: (theme) => theme.typography.pxToRem(14)
                }
              })}
            >
              {fieldLabel}
            </FieldSubtitle>
          }
        />
      </Grid>
      <Grid item container direction="column" xs={isPlanField ? 6 : 7} gap={2}>
        {fieldComponent}
      </Grid>
      {children && <Grid xs={12}>{children}</Grid>}
    </Grid>
  );
};
