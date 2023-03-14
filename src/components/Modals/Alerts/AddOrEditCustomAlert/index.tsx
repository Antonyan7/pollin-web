import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { DialogContent, Grid, Theme } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import BaseModal from '@ui-component/Modal/BaseModal';

import Actions from './Actions';
import Body from './Body';

export interface AddOrEditCustomAlertModalProps {
  alertId?: string;
  title?: string;
  description?: string;
}

const getInitialValues = (title?: string, description?: string) => ({
  title: title ?? '',
  description: description ?? ''
});

const AddOrEditCustomAlertModal = ({ alertId, title, description }: AddOrEditCustomAlertModalProps) => {
  const isPatientCustomAlertCreated = useAppSelector(patientsSelector.isPatientCustomAlertCreated);

  const methods = useForm({
    defaultValues: getInitialValues(title, description),
    mode: 'onSubmit'
  });

  const [t] = useTranslation();
  const modalTitle = !title
    ? t(Translation.MODAL_ADD_OR_EDIT_PATIENT_ALERT_TITLE)
    : t(Translation.MODAL_ADD_OR_EDIT_PATIENT_ALERT_EDIT_TITLE);

  const onClose = () => dispatch(viewsMiddleware.closeModal(ModalName.AddOrEditCustomAlertModal));

  return (
    <BaseModal
      isLoading={isPatientCustomAlertCreated}
      title={modalTitle}
      onClose={onClose}
      titleSx={{
        '& .MuiSvgIcon-root': {
          fill: (theme: Theme) => theme.palette.primary.main
        },
        marginTop: margins.top8
      }}
    >
      <Grid>
        <FormProvider {...methods}>
          <DialogContent sx={{ p: paddings.all8 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Body />
              </Grid>
              <Grid item xs={12}>
                <Actions alertId={alertId} title={title} />
              </Grid>
            </Grid>
          </DialogContent>
        </FormProvider>
      </Grid>
    </BaseModal>
  );
};

export default AddOrEditCustomAlertModal;
