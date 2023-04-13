import React from 'react';
import { Grid } from '@mui/material';
import { paddings } from 'themes/themeConstants';

import {
  AbnormalResults,
  BiologicalChildren,
  BiologicalChildrenWithCurrentPartner,
  DiagnosedConditions,
  DifficultyWithErections,
  GenitalSurgery,
  Infections,
  PastSemenAnalysis,
  PreviousConception,
  TesticularIssues,
  Toxins,
  UndescendedTesticals,
  Vasectomy,
  VasectomyReversal
} from './fields';

const MaleGenitourinaryEditForm = () => (
  <Grid sx={{ py: paddings.topBottom32 }}>
    <PreviousConception />
    <BiologicalChildren />
    <BiologicalChildrenWithCurrentPartner />
    <PastSemenAnalysis />
    <AbnormalResults />
    <DiagnosedConditions />
    <Vasectomy />
    <VasectomyReversal />
    <DifficultyWithErections />
    <UndescendedTesticals />
    <TesticularIssues />
    <Toxins />
    <Infections />
    <GenitalSurgery />
  </Grid>
);

export default MaleGenitourinaryEditForm;
