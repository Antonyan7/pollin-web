import React, { useEffect } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CircularProgress, Grid, MenuItem, Stack, Typography } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { Translation } from 'constants/translations';

import { BaseSelectWithLoading } from '@ui-component/BaseDropdownWithLoading';
import { DateUtil } from '@utils/date/DateUtil';

import SpecimenDataItem from './SpecimenTestData/SpecimenDataItem';

const SecondStepContent = () => {
  const [t] = useTranslation();
  const specimensForAppointment = useAppSelector(resultsSelector.appointmentSpecimens);
  const specimenStorageLocations = useAppSelector(resultsSelector.specimenStorageLocations);
  const isSpecimenStorageLocationsLoading = useAppSelector(resultsSelector.isSpecimenStorageLocationsLoading);
  const { control, reset } = useFormContext();

  const { fields } = useFieldArray({
    name: 'locations',
    control
  });

  useEffect(() => {
    dispatch(resultsMiddleware.getSpecimenStorageLocations());
    reset();
  }, [reset]);

  const collectedOnLabel = t(Translation.PAGE_SPECIMEN_TRACKING_MODAL_COLLECTION_COLLECTED_ON_TITLE);
  const collectedOnTimeLabel = t(Translation.PAGE_SPECIMEN_TRACKING_MODAL_COLLECTION_COLLECTED_ON_TIME_LABEL);
  const collectedOnDateLabel = t(Translation.PAGE_SPECIMEN_TRACKING_MODAL_COLLECTION_COLLECTED_ON_DATE_LABEL);

  return !isSpecimenStorageLocationsLoading ? (
    <Stack spacing={3}>
      <Typography variant="h4">{collectedOnLabel}:</Typography>
      <Stack spacing={1}>
        <SpecimenDataItem
          label={collectedOnDateLabel}
          value={
            specimensForAppointment?.collectionDate
              ? DateUtil.formatDateOnly(specimensForAppointment?.collectionDate)
              : specimensForAppointment?.collectionDate
          }
        />
        <SpecimenDataItem
          label={collectedOnTimeLabel}
          value={
            specimensForAppointment?.collectionDate
              ? DateUtil.formatTimeOnly(specimensForAppointment?.collectionDate)
              : specimensForAppointment?.collectionDate
          }
        />
      </Stack>
      {fields.map((field, index) => (
        <Stack key={field.id} display="flex" spacing={3}>
          <Stack direction="row">
            <Typography>{t(Translation.PAGE_SPECIMEN_TRACKING_MODAL_COLLECTION_SPECIMEN_ID_LABEL)}:</Typography>
            <Controller
              name={`locations.${index}.identifier`}
              control={control}
              render={({ field: identifierField }) => <Typography pl={1}>{identifierField.value}</Typography>}
            />
          </Stack>
          <Controller
            name={`locations.${index}.storageLocationId`}
            control={control}
            render={({ field: storageLocationIdField }) => (
              <BaseSelectWithLoading
                isLoading={isSpecimenStorageLocationsLoading}
                value={storageLocationIdField.value}
                onChange={(e) => storageLocationIdField.onChange(e.target.value)}
                label={t(Translation.PAGE_SPECIMEN_TRACKING_MODAL_COLLECTION_SELECT_STORE_LABEL)}
              >
                {specimenStorageLocations.map((location) => (
                  <MenuItem key={location.id} value={location.id}>
                    {location.title}
                  </MenuItem>
                ))}
              </BaseSelectWithLoading>
            )}
          />
        </Stack>
      ))}
      <Stack />
    </Stack>
  ) : (
    <Grid display="flex" justifyContent="center" alignItems="center">
      <CircularProgress />
    </Grid>
  );
};

export default SecondStepContent;
