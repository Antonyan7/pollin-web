import React from 'react';
import { useTranslation } from 'react-i18next';
import { Divider, Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { resultsSelector } from '@redux/slices/results';
import { Translation } from 'constants/translations';
import { margins } from 'themes/themeConstants';

import { SpecimenTrackingCollectionModalSteps } from '../types';

import SpecimenDataItem from './SpecimenTestData/SpecimenDataItem';
import FirstStepContent from './FirstStepContent';
import SpecimenDataCollectionProgressBar from './ProgressBar';
import SecondStepContent from './SecondStepContent';

const Body: React.FC<SpecimenTrackingCollectionModalSteps> = ({ collectionModalCurrentStep }) => {
  const [t] = useTranslation();
  const specimensForAppointment = useAppSelector(resultsSelector.appointmentSpecimens);
  const isSpecimensForAppointmentLoading = useAppSelector(resultsSelector.isAppointmentSpecimensLoading);
  const patientContactInformation = useAppSelector(patientsSelector.patientContactInformation);

  const areThereAnyOrders =
    specimensForAppointment && specimensForAppointment.specimens.length > 0 && !isSpecimensForAppointmentLoading;

  return (
    <Grid item xs={12}>
      <Grid mt={margins.top12} mb={margins.bottom32}>
        <SpecimenDataCollectionProgressBar
          collectionModalCurrentStep={collectionModalCurrentStep}
          isProgressFreezed={!areThereAnyOrders}
        />
      </Grid>
      <Grid>
        <Stack spacing={4}>
          <Stack spacing={2}>
            <SpecimenDataItem
              label={t(Translation.MODAL_EXTERNAL_RESULTS_PATIENT_NAME)}
              value={patientContactInformation.name}
            />
            <SpecimenDataItem
              label={t(Translation.MODAL_EXTERNAL_RESULTS_PATIENT_ID)}
              value={patientContactInformation.id}
            />
            <SpecimenDataItem
              label={t(Translation.MODAL_EXTERNAL_RESULTS_PATIENT_DATE_OF_BIRTH)}
              value={patientContactInformation.dateOfBirth}
            />
          </Stack>
          <Grid>
            <SpecimenDataItem
              label={t(Translation.PAGE_SPECIMEN_TRACKING_MODAL_COLLECTION_TOTAL_VIALS_LABEL)}
              value={`${
                specimensForAppointment?.totalVialsCount
                  ? specimensForAppointment?.totalVialsCount
                  : t(Translation.PAGE_SPECIMEN_TRACKING_MODAL_COLLECTION_TOTAL_ZERO_VIALS_LABEL)
              }`}
            />
          </Grid>
        </Stack>
      </Grid>
      <Divider sx={{ my: margins.topBottom24 }} />
      {areThereAnyOrders ? (
        <Grid item>
          {collectionModalCurrentStep === 1 && <FirstStepContent />}
          {collectionModalCurrentStep === 2 && <SecondStepContent />}
        </Grid>
      ) : (
        <Grid item display="flex" justifyContent="center">
          <Typography sx={{ fontWeight: 600, color: (theme) => theme.palette.primary.main }} alignContent="center">
            {t(Translation.PAGE_SPECIMEN_TRACKING_MODAL_COLLECTION_NO_ORDERS_MESSAGE)}
          </Typography>
        </Grid>
      )}
      <Divider sx={{ mt: margins.top32 }} />
    </Grid>
  );
};

export default Body;
