import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogContent, Grid, Theme } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { tasksSelector } from '@redux/slices/tasks';
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

const AddOrEditCustomAlertModal = ({ alertId, title, description }: AddOrEditCustomAlertModalProps) => {
  const isTaskDetailsLoading = useAppSelector(tasksSelector.isTaskDetailsLoading);

  const [t] = useTranslation();
  const modalTitle = !title
    ? t(Translation.MODAL_ADD_OR_EDIT_PATIENT_ALERT_TITLE)
    : t(Translation.MODAL_ADD_OR_EDIT_PATIENT_ALERT_EDIT_TITLE);

  const [fieldValue, setFieldValue] = useState(title ?? '');
  const [descriptionValue, setDescriptionValue] = useState(description ?? '');

  const onClose = () => dispatch(viewsMiddleware.closeModal(ModalName.AddOrEditCustomAlertModal));

  return (
    <BaseModal
      isLoading={isTaskDetailsLoading}
      title={modalTitle}
      onClose={onClose}
      sx={{
        '& .MuiSvgIcon-root': {
          fill: (theme: Theme) => theme.palette.primary.main
        },
        marginTop: margins.top8
      }}
    >
      <Grid>
        <DialogContent sx={{ p: paddings.all8 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Body
                fieldValue={fieldValue}
                setFieldValue={setFieldValue}
                descriptionValue={descriptionValue}
                setDescriptionValue={setDescriptionValue}
              />
            </Grid>
            <Grid item xs={12}>
              <Actions alertId={alertId} title={title} fieldValue={fieldValue} descriptionValue={descriptionValue} />
            </Grid>
          </Grid>
        </DialogContent>
      </Grid>
    </BaseModal>
  );
};

export default AddOrEditCustomAlertModal;
