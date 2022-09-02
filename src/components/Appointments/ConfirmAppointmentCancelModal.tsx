import React, { useCallback, useState } from 'react';
import { StyledInputLabel } from '@components/Appointments/CommonMaterialComponents';
import { CloseOutlined } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material';
import { Stack } from '@mui/system';
import { ModalName } from 'constants/modals';
import { cancellationReasons } from 'helpers/constants';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware } from 'redux/slices/booking';
import { viewsMiddleware, viewsSelector } from 'redux/slices/views';

const ConfirmAppointmentsModal = () => {
  const [openOtherReasonField, setOpenOtherReasonField] = useState<boolean>(false);
  const [cancellationReason, setCancellationReason] = useState<string>('');
  const { appointmentId } = useAppSelector(viewsSelector.modal).props;

  const onSelectButtonChange = useCallback((event: SelectChangeEvent<unknown>) => {
    const value: string = event.target.value as string;
    const isOtherField = value === cancellationReasons[cancellationReasons.length - 1];

    setOpenOtherReasonField(isOtherField);
    setCancellationReason(isOtherField ? '' : value);
  }, []);

  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.setModalState({ name: ModalName.EditAppointmentModal, props: { appointmentId } }));
  }, [appointmentId]);

  const onConfirm = useCallback(() => {
    setOpenOtherReasonField(false);
    dispatch(viewsMiddleware.setModalState({ name: ModalName.NONE, props: {} }));
    console.warn({ cancellationReason });
    // TODO: new endpoint will be added in the future
    // dispatch(
    //   bookingMiddleware.cancelAppointment(appointmentId, {
    //     cancellationReason,
    //   })
    // );
    dispatch(bookingMiddleware.clearAppointmentDetails());
  }, [cancellationReason]);

  const onReasonChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setCancellationReason(event.target.value);
  }, []);

  return (
    <Dialog open onClose={onClose}>
      <Grid sx={{ width: '500px' }}>
        <DialogTitle>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography
                sx={{
                  fontSize: '1.25rem',
                  fontWeight: 700
                }}
              >
                Confirm Cancellation
              </Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={onClose}>
                <CloseOutlined />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography>Please confirm the reason for the cancellation.</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <StyledInputLabel id="cancel-appointment-label">Reason for Cancellation</StyledInputLabel>
                <Select
                  IconComponent={KeyboardArrowDownIcon}
                  id="cancel-appointment-label"
                  labelId="cancel-appointment-label"
                  label="Reason for Cancellation"
                  onChange={onSelectButtonChange}
                >
                  {cancellationReasons.map((reasonItem) => (
                    <MenuItem value={reasonItem} key={reasonItem.toString()}>
                      {reasonItem}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {openOtherReasonField && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="reason_for_cancellation"
                  multiline
                  name="reason_for_cancellation"
                  rows={4}
                  placeholder="Reason for Cancellation"
                  onChange={onReasonChange}
                />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 3 }}>
          <Grid container>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
                <Button
                  onClick={onConfirm}
                  sx={{
                    width: '160px',
                    height: '40px'
                  }}
                >
                  Confirm
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </DialogActions>
      </Grid>
    </Dialog>
  );
};

export default ConfirmAppointmentsModal;
