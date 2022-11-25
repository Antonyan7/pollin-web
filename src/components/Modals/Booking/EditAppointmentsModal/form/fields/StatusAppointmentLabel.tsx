import React, { useEffect } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyledButton, StyledInputLabel, StyledSelectButton } from '@components/Appointments/CommonMaterialComponents';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FormControl, Grid, MenuItem } from '@mui/material';
import { bookingMiddleware, bookingSelector } from '@redux/slices/booking';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { appointmentStatusData } from 'helpers/constants';
import { dispatch, useAppSelector } from 'redux/hooks';
import { viewsMiddleware } from 'redux/slices/views';
import { borders, margins, paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import { IFormValues } from '../types';

const StatusAppointmentLabel = () => {
  const appointmentStatusFieldName = 'appointment.status';
  const details = useAppSelector(bookingSelector.appointmentDetails);
  const { control, getValues } = useFormContext<IFormValues>();
  const { field } = useController<IFormValues>({ name: appointmentStatusFieldName, control });
  const { value, ...fieldProps } = field;
  const [t] = useTranslation();
  const onClose = () => dispatch(viewsMiddleware.closeModal(ModalName.EditAppointmentModal));
  const statusAppointmentLabel = t(Translation.MODAL_APPOINTMENTS_EDIT_BUTTON_STATUS);
  const statusAppointmentLabelCyId = CypressIds.MODAL_APPOINTMENTS_EDIT_BUTTON_STATUS;

  useEffect(() => {
    if (field.value && !(details?.appointment?.status === field.value)) {
      dispatch(bookingMiddleware.setEditSaveButtonDisabled(false));
    } else {
      dispatch(bookingMiddleware.setEditSaveButtonDisabled(true));
    }
  }, [details?.appointment?.status, field.value]);

  return (
    <Grid container spacing={3} sx={{ marginTop: margins.top0, paddingLeft: paddings.left24 }}>
      <Grid item xs={getValues('serviceType.isVirtual') ? 6 : 12}>
        <FormControl fullWidth>
          <StyledInputLabel id="status-appointment-label">{statusAppointmentLabel}</StyledInputLabel>
          <StyledSelectButton
            data-cy={statusAppointmentLabelCyId}
            MenuProps={{
              style: { maxHeight: 260 },
              PaperProps: {
                style: { border: `${borders.solid2px}` }
              }
            }}
            IconComponent={KeyboardArrowDownIcon}
            id="status-appointment-label"
            labelId="status-appointment-label"
            label={statusAppointmentLabel}
            defaultValue={value}
            {...fieldProps}
          >
            {appointmentStatusData.map((statusItem) => (
              <MenuItem value={statusItem} key={statusItem.toString()}>
                {statusItem}
              </MenuItem>
            ))}
          </StyledSelectButton>
        </FormControl>
      </Grid>
      {getValues('serviceType.isVirtual') && (
        <Grid item xs={getValues('serviceType.isVirtual') ? 6 : 12}>
          <StyledButton
            variant="contained"
            sx={{
              width: '100%',
              height: '100%'
            }}
            onClick={onClose}
          >
            {t(Translation.MODAL_APPOINTMENTS_EDIT_BUTTON_JOIN)}
          </StyledButton>
        </Grid>
      )}
    </Grid>
  );
};

export default StatusAppointmentLabel;
