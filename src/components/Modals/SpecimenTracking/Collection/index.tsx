import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { DialogContent, Grid } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import BaseModal from '@ui-component/Modal/BaseModal';

import Actions from './Actions';
import Body from './Body';
import { SpecimenTrackingCollectionModalProps } from './types';

const SpecimenTrackingCollectionModal: React.FC<SpecimenTrackingCollectionModalProps> = ({ appointmentId }) => {
  const [collectionModalCurrentStep, setCollectionModalCurrentStep] = useState<number>(1);

  const isSpecimensForAppointmentLoading = useAppSelector(resultsSelector.isAppointmentSpecimensLoading);
  const specimensForAppointment = useAppSelector(resultsSelector.appointmentSpecimens);

  const methods = useForm({
    defaultValues: {
      locations: specimensForAppointment?.specimens.map((specimen) => ({
        identifier: specimen.identifier,
        specimenId: specimen.id,
        storageLocationId: '',
        id: specimen.identifier
      }))
    }
  });

  const { reset } = methods;

  useEffect(() => {
    if (appointmentId) {
      dispatch(resultsMiddleware.getSpecimensForAppointment(appointmentId));
    }
  }, [appointmentId]);

  useEffect(() => {
    // Make sure that we have initial fields
    if (specimensForAppointment) {
      reset();
    }
  }, [reset, specimensForAppointment, isSpecimensForAppointmentLoading]);

  const [t] = useTranslation();
  const specimenTrackingCollectionTitle = t(Translation.PAGE_SPECIMEN_TRACKING_MODAL_COLLECTION_TITLE);

  const onClose = () => dispatch(viewsMiddleware.closeModal(ModalName.SpecimenTrackingCollection));

  return (
    <BaseModal isLoading={isSpecimensForAppointmentLoading} title={specimenTrackingCollectionTitle} onClose={onClose}>
      <FormProvider {...methods}>
        <Grid>
          <DialogContent sx={{ p: paddings.all8, minWidth: 500 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Body collectionModalCurrentStep={collectionModalCurrentStep} />
              </Grid>
              <Grid item xs={12}>
                <Actions
                  appointmentId={appointmentId}
                  collectionModalCurrentStep={collectionModalCurrentStep}
                  setCollectionModalCurrentStep={setCollectionModalCurrentStep}
                  onClose={onClose}
                />
              </Grid>
            </Grid>
          </DialogContent>
        </Grid>
      </FormProvider>
    </BaseModal>
  );
};

export default SpecimenTrackingCollectionModal;
