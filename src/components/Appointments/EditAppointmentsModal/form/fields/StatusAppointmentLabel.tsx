import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyledButton, StyledInputLabel, StyledSelectButton } from '@components/Appointments/CommonMaterialComponents';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FormControl, Grid, MenuItem } from '@mui/material';
import { ModalName } from 'constants/modals';
import { Translation } from 'constants/translations';
import { appointmentStatusData } from 'helpers/constants';
import { dispatch } from 'redux/hooks';
import { viewsMiddleware } from 'redux/slices/views';

import { IFormValues } from '../types';

const StatusAppointmentLabel = () => {
  const appointmentStatusFieldName = 'appointment.status';
  const { control, getValues } = useFormContext<IFormValues>();
  const { field } = useController<IFormValues>({ name: appointmentStatusFieldName, control });
  const { value, ...fieldProps } = field;
  const [t] = useTranslation();
  const onClose = () => dispatch(viewsMiddleware.setModalState({ name: ModalName.NONE, props: {} }));
  const statusAppointmentLabel = t(Translation.MODAL_APPOINTMENTS_EDIT_BUTTON_STATUS);

  return (
    <Grid container spacing={3} sx={{ marginTop: '0px', paddingLeft: '24px' }}>
      <Grid item xs={getValues('serviceType.isVirtual') ? 6 : 12}>
        <FormControl fullWidth>
          <StyledInputLabel id="status-appointment-label">{statusAppointmentLabel}</StyledInputLabel>
          <StyledSelectButton
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
