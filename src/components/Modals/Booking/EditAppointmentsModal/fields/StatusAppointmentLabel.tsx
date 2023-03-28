import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyledButton } from '@components/common/MaterialComponents';
import { IEditAppointmentForm } from '@components/Modals/Booking/EditAppointmentsModal/form/initialValues';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FormControl, Grid, MenuItem } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { bookingSelector } from '@redux/slices/booking';
import { viewsMiddleware } from '@redux/slices/views';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { borders, margins, paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';
import { AppointmentStatus, AppointmentStatusEnumKey, ICancelStatusItem } from 'types/reduxTypes/bookingStateTypes';

import { BaseSelectWithLoading } from '@ui-component/BaseDropdownWithLoading';

const StatusAppointmentLabel = () => {
  const [t] = useTranslation();
  const details = useAppSelector(bookingSelector.appointmentDetails);
  const appointmentStatusFieldName = 'status';
  const statusAppointmentLabel = t(Translation.MODAL_APPOINTMENTS_EDIT_BUTTON_STATUS);
  const statusAppointmentLabelCyId = CypressIds.MODAL_APPOINTMENTS_EDIT_BUTTON_STATUS;
  const { control, getValues, register } = useFormContext<IEditAppointmentForm>();
  const { field } = useController<IEditAppointmentForm>({ name: appointmentStatusFieldName, control });
  const { value, ...fieldProps } = field;
  const onClose = () => dispatch(viewsMiddleware.closeModal(ModalName.EditAppointmentModal));
  const appointmentStatusData = details?.statusVariations;

  return (
    <Grid container spacing={3} sx={{ marginTop: margins.top0, paddingLeft: paddings.left24 }}>
      <Grid item xs={getValues('isVirtual') ? 6 : 12}>
        <FormControl fullWidth>
          <BaseSelectWithLoading
            data-cy={statusAppointmentLabelCyId}
            MenuProps={{
              style: { maxHeight: 260 },
              PaperProps: {
                style: { border: `${borders.solid2px}` }
              }
            }}
            value={field.value}
            IconComponent={KeyboardArrowDownIcon}
            id="status-appointment-label"
            labelId="status-appointment-label"
            label={statusAppointmentLabel}
            {...fieldProps}
            {...register('status')}
          >
            <MenuItem disabled value={(field.value as string) ?? ''} sx={{ display: 'none' }}>
              {AppointmentStatus[field.value as AppointmentStatusEnumKey]}
            </MenuItem>
            {appointmentStatusData?.map((statusItem: ICancelStatusItem) => (
              <MenuItem value={statusItem.id} key={statusItem.id}>
                {statusItem.title}
              </MenuItem>
            ))}
          </BaseSelectWithLoading>
        </FormControl>
      </Grid>
      {getValues('isVirtual') && (
        <Grid item xs={getValues('isVirtual') ? 6 : 12}>
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
