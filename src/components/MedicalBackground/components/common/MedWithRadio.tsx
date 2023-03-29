import React, { PropsWithChildren, ReactNode } from 'react';
import { Grid, Typography } from '@mui/material';
import { margins, paddings } from 'themes/themeConstants';

import MedicalBackgroundNote from './MedicalBackgroundNote';
import MedicalFormRadio from './MedicalFormRadio';
import MedicalComponentWithRadioView from './MedWithRadioView';
import { ConsultationTitleWithIcon } from '.';

interface MedicalComponentWithRadioProps extends PropsWithChildren {
  iconTitle: string;
  fieldName: string;
  onNoteClick?: () => void;
  showNote?: boolean;
  children?: ReactNode;
  isEditable?: boolean;
  field?: string;
}

const MedicalComponentWithRadio = ({
  iconTitle,
  field,
  isEditable,
  fieldName,
  onNoteClick,
  showNote,
  children
}: MedicalComponentWithRadioProps) =>
  isEditable ? (
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
        <ConsultationTitleWithIcon description={iconTitle} onClick={onNoteClick} />
      </Grid>
      <Grid item container direction="column" xs={7} gap={2}>
        <MedicalFormRadio fieldName={`${fieldName}.value`} />
        <MedicalBackgroundNote onClick={() => onNoteClick?.()} visible={showNote ?? false} fieldName={fieldName} />
        {children}
      </Grid>
    </Grid>
  ) : (
    <MedicalComponentWithRadioView iconTitle={iconTitle}>
      <Typography>{field}</Typography>
    </MedicalComponentWithRadioView>
  );

export default MedicalComponentWithRadio;
