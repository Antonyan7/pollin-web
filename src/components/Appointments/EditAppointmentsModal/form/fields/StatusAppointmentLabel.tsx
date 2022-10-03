import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledButton, StyledInputLabel, StyledSelectButton } from '@components/Appointments/CommonMaterialComponents';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FormControl, Grid, MenuItem } from '@mui/material';
import { ModalName } from 'constants/modals';
import { Translation } from 'constants/translations';
import { FormikValues, useFormikContext } from 'formik';
import { appointmentStatusData } from 'helpers/constants';
import { dispatch } from 'redux/hooks';
import { viewsMiddleware } from 'redux/slices/views';

const StatusAppointmentLabel = () => {
  const { values, handleChange }: FormikValues = useFormikContext();
  const [t] = useTranslation();
  const onClose = () => dispatch(viewsMiddleware.setModalState({ name: ModalName.NONE, props: {} }));
  const statusAppointmentLabel = t(Translation.MODAL_APPOINTMENTS_EDIT_BUTTON_STATUS);

  return (
    <Grid container spacing={3} sx={{ marginTop: '0px', paddingLeft: '24px' }}>
      <Grid item xs={values?.serviceType?.isVirtual ? 6 : 12}>
        <FormControl fullWidth>
          <StyledInputLabel id="status-appointment-label">{statusAppointmentLabel}</StyledInputLabel>
          <StyledSelectButton
            IconComponent={KeyboardArrowDownIcon}
            id="status-appointment-label"
            labelId="status-appointment-label"
            label={statusAppointmentLabel}
            name="status"
            defaultValue={values.appointment.status}
            onChange={handleChange('appointment.status')}
          >
            {appointmentStatusData.map((statusItem) => (
              <MenuItem value={statusItem} key={statusItem.toString()}>
                {statusItem}
              </MenuItem>
            ))}
          </StyledSelectButton>
        </FormControl>
      </Grid>
      {values?.serviceType?.isVirtual && (
        <Grid item xs={values?.serviceType?.isVirtual ? 6 : 12}>
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
