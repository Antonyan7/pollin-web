import React, { PropsWithChildren, useState } from 'react';
import { Grid } from '@mui/material';
import { margins, paddings } from 'themes/themeConstants';

import MedicalBackgroundNote from '../MedicalBackgroundNote';
import MedicalFormRadio from '../MedicalFormRadio';
import { ConsultationTitleWithIcon } from '..';

interface MedicalHistoryRadioProps extends PropsWithChildren {
  iconTitle: string;
  fieldName: string;
  controlFieldName?: string;
}

const MedicalHistoryRadio = ({ iconTitle, fieldName, children, controlFieldName }: MedicalHistoryRadioProps) => {
  const [shouldShowNote, setShouldShowNote] = useState(false);
  const onNoteClick = () => {
    setShouldShowNote((isShown) => !isShown);
  };

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
        <ConsultationTitleWithIcon description={iconTitle} onClick={onNoteClick} />
      </Grid>
      <Grid item container direction="column" xs={7} gap={2}>
        <MedicalFormRadio fieldName={`${fieldName}.${controlFieldName ?? 'value'}`} />
        <MedicalBackgroundNote onClick={onNoteClick} visible={shouldShowNote ?? false} fieldName={fieldName} />
        {children}
      </Grid>
    </Grid>
  );
};

export default MedicalHistoryRadio;
