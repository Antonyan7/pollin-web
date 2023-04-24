import React from 'react';
import { IDiagnosedConditionsItem } from '@axios/patientEmr/managerPatientEmrTypes';
import {
  MedicalFormTitleNo,
  MedicalFormTitleYes
} from '@components/MedicalBackground/components/common/MedWithItemsView';
import { Grid } from '@mui/material';

interface RenderDiagnosedProps {
  diagnosedFields: IDiagnosedConditionsItem[];
}

const RenderDiagnosed = ({ diagnosedFields }: RenderDiagnosedProps) => (
  <Grid item container direction="column" gap={1}>
    {diagnosedFields && diagnosedFields.length ? (
      <>
        <Grid>
          <MedicalFormTitleYes />
        </Grid>
        {diagnosedFields.map((diagnosedItem) => (
          <Grid key={diagnosedItem.id}>{diagnosedItem.id}</Grid>
        ))}
      </>
    ) : (
      <MedicalFormTitleNo />
    )}
  </Grid>
);

export default RenderDiagnosed;
