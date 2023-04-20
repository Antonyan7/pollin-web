import React, { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Button, DialogActions, Grid, Stack } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { bookingSelector } from '@redux/slices/booking';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { borderRadius, margins, paddings } from 'themes/themeConstants';
import { AppointmentStatus } from 'types/reduxTypes/bookingStateTypes';

import { getEnumKeyByEnumValue } from '@utils/enumUtils';

import {
  ISpecimenCollectionFormLocationData,
  ISpecimenCollectionLocationsField,
  SpecimenCollectionModalActionsProps
} from './types';

const Actions: React.FC<SpecimenCollectionModalActionsProps> = ({
  collectionModalCurrentStep,
  setCollectionModalCurrentStep,
  appointmentId,
  onClose
}) => {
  const specimensForAppointment = useSelector(resultsSelector.appointmentSpecimens);
  const isSpecimensForAppointmentLoading = useSelector(resultsSelector.isAppointmentSpecimensLoading);

  const appointmentDetails = useSelector(bookingSelector.appointmentDetails);
  const appointmentStatus = appointmentDetails?.appointment.status;
  const patientName = appointmentDetails?.patient.name ?? '';

  const areThereAnyOrders =
    specimensForAppointment?.specimens &&
    specimensForAppointment?.specimens?.length > 0 &&
    !isSpecimensForAppointmentLoading;

  const { handleSubmit } = useFormContext<ISpecimenCollectionLocationsField>();
  const { locations = [] } = useWatch();

  const areAllLocationsFilled =
    !!locations && locations?.every((location: ISpecimenCollectionFormLocationData) => !!location.storageLocationId);

  const [t] = useTranslation();
  const isFirstStep = collectionModalCurrentStep === 1;
  const confirmButtonLabel = (() => {
    const doneButtonLabel = t(Translation.PAGE_SPECIMEN_TRACKING_MODAL_COLLECTION_BUTTON_COLLECTION_DONE_LABEL);

    if (isFirstStep) {
      return t(Translation.PAGE_SPECIMEN_TRACKING_MODAL_COLLECTION_BUTTON_COLLECT_LABEL);
    }

    if (!areAllLocationsFilled) {
      return t(Translation.PAGE_SPECIMEN_TRACKING_MODAL_COLLECTION_BUTTON_COLLECTION_COMPLETED_LABEL);
    }

    return doneButtonLabel;
  })();

  const onSubmit = (data: ISpecimenCollectionLocationsField) => {
    if (data) {
      dispatch(
        resultsMiddleware.submitSpecimenCollections(
          {
            appointmentId,
            collections: locations.map(({ specimenId, storageLocationId }: ISpecimenCollectionFormLocationData) => ({
              specimenId,
              storageLocationId
            }))
          },
          patientName
        )
      );
      onClose();
    }
  };

  const handleSpecimenCollectionConfirmation = () => {
    if (isFirstStep) {
      setCollectionModalCurrentStep?.(2);
    } else {
      handleSubmit(onSubmit)();
    }
  };

  const handleBackToFirstStep = () => {
    setCollectionModalCurrentStep?.(1);
  };

  const isSubmitButtonDisabled = isFirstStep ? !areThereAnyOrders : !areAllLocationsFilled;

  useEffect(() => {
    if (appointmentStatus !== AppointmentStatus.InProgress && areThereAnyOrders) {
      dispatch(
        resultsMiddleware.updateSpecimenCollectionAppointmentStatus({
          id: appointmentId,
          status: getEnumKeyByEnumValue(AppointmentStatus, AppointmentStatus.InProgress)
        })
      );
    }
  }, [appointmentId, appointmentStatus, areThereAnyOrders]);

  return (
    <DialogActions sx={{ marginTop: margins.top8, p: 0 }}>
      <Grid container justifyContent="flex-end" alignItems="center">
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent={isFirstStep ? 'flex-end' : 'space-between'}>
            {!isFirstStep && (
              <Button
                onClick={handleBackToFirstStep}
                sx={{
                  borderRadius: borderRadius.radius8,
                  py: paddings.topBottom8,
                  px: paddings.leftRight20
                }}
                variant="contained"
                data-cy={CypressIds.PAGE_SPECIMEN_COLLECTION_MODAL_BACK}
              >
                {t(Translation.PAGE_SPECIMEN_TRACKING_MODAL_COLLECTION_BUTTON_BACK_LABEL)}
              </Button>
            )}
            <Button
              disabled={isSubmitButtonDisabled}
              sx={{
                borderRadius: borderRadius.radius8,
                py: paddings.topBottom8,
                px: paddings.leftRight24,
                color: (theme) => theme.palette.common.white
              }}
              data-cy={
                isFirstStep
                  ? CypressIds.PAGE_SPECIMEN_COLLECTION_MODAL_COLLECT_BUTTON
                  : CypressIds.PAGE_SPECIMEN_COLLECTION_MODAL_COLLECTION_DONE
              }
              color="primary"
              variant="contained"
              onClick={handleSpecimenCollectionConfirmation}
            >
              {confirmButtonLabel}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </DialogActions>
  );
};

export default Actions;
