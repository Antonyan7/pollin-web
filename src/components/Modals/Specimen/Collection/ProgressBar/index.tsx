import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check } from '@mui/icons-material';
import { Divider, Grid, Typography } from '@mui/material';
import { Translation } from 'constants/translations';

import { SpecimenDataCollectionProgressBarProps } from '../types';

import ProgressBarIndicator from './ProgressBarIndicator';

const SpecimenDataCollectionProgressBar: React.FC<SpecimenDataCollectionProgressBarProps> = ({
  collectionModalCurrentStep,
  isProgressFreezed
}) => {
  const [t] = useTranslation();

  const firstProgressBarIndicatorLabel = collectionModalCurrentStep > 1 ? <Check /> : collectionModalCurrentStep;
  const secondProgressBarIndicatorLabel = 2;
  const isFirstProgressbarIndicatorDisabled = isProgressFreezed;
  const isSecondProgressbarIndicatorDisabled = isProgressFreezed || collectionModalCurrentStep === 1;
  const confirmCollectionIndicatorTextLabel = t(
    Translation.PAGE_SPECIMEN_TRACKING_MODAL_COLLECTION_PROGRESS_CONFIRM_COLLECTION_LABEL
  );
  const printBarcodeIndicatorTextLabel = t(
    Translation.PAGE_SPECIMEN_TRACKING_MODAL_COLLECTION_PROGRESS_PRINT_BARCODE_LABEL
  );

  return (
    <Grid xs={12} gap={2} item display="flex" alignItems="center">
      <Grid item xs={3.5} display="flex" justifyContent="space-between" alignItems="center">
        <ProgressBarIndicator label={firstProgressBarIndicatorLabel} disabled={isFirstProgressbarIndicatorDisabled} />
        <Typography>{printBarcodeIndicatorTextLabel}</Typography>
      </Grid>
      <Grid item xs={4.5}>
        <Divider sx={{ color: (theme) => theme.palette.primary.light }} />
      </Grid>
      <Grid item xs={4} display="flex" justifyContent="space-between" alignItems="center">
        <ProgressBarIndicator label={secondProgressBarIndicatorLabel} disabled={isSecondProgressbarIndicatorDisabled} />
        <Typography>{confirmCollectionIndicatorTextLabel}</Typography>
      </Grid>
    </Grid>
  );
};

export default SpecimenDataCollectionProgressBar;
