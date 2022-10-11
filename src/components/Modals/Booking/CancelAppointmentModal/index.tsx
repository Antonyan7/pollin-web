import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import { Translation } from 'constants/translations';
import { cancellationReasons } from 'helpers/constants';
import { dispatch } from 'redux/hooks';
import { bookingMiddleware } from 'redux/slices/booking';
import { viewsMiddleware } from 'redux/slices/views';

export interface CancelAppointmentModalProps {
  appointmentId: string;
}

const CancelAppointmentModal = ({ appointmentId }: CancelAppointmentModalProps) => {
  const [openOtherReasonField, setOpenOtherReasonField] = useState<boolean>(false);
  const [cancellationReason, setCancellationReason] = useState<string>('');
  const [t] = useTranslation();

  const onSelectButtonChange = useCallback((event: SelectChangeEvent<unknown>) => {
    const value: string = event.target.value as string;
    const isOtherField = value === cancellationReasons[cancellationReasons.length - 1];

    setOpenOtherReasonField(isOtherField);
    setCancellationReason(isOtherField ? '' : value);
  }, []);

  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.closeModal(ModalName.CancelAppointmentModal));
  }, []);

  const onConfirm = useCallback(() => {
    setOpenOtherReasonField(false);
    dispatch(bookingMiddleware.cancelAppointment(appointmentId, cancellationReason));
    dispatch(bookingMiddleware.clearAppointmentDetails());
    onClose();
  }, [onClose, appointmentId, cancellationReason]);

  const onReasonChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setCancellationReason(event.target.value);
  }, []);

  return (
    <Dialog open onClose={onClose}>
      <Grid sx={{ width: '500px' }}>
        <DialogTitle>
          <Grid sx={{ margin: '10px' }} container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography
                sx={{
                  fontSize: '1.25rem',
                  fontWeight: 700
                }}
              >
                {t(Translation.MODAL_APPOINTMENTS_CONFIRM_CANCEL_TITLE)}
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
          <Grid sx={{ minHeight: '300px' }} container spacing={3}>
            <Grid sx={{ p: 5, height: '100px' }} container spacing={2}>
              <Grid item xs={12}>
                <Typography> {t(Translation.MODAL_APPOINTMENTS_CONFIRM_CANCEL_DESCRIPTION)}</Typography>
              </Grid>
              <Grid sx={{ marginTop: '20px' }} item xs={12}>
                <FormControl fullWidth>
                  <StyledInputLabel id="cancel-appointment-label">
                    {t(Translation.MODAL_APPOINTMENTS_CONFIRM_CANCEL_SELECT_REASON)}
                  </StyledInputLabel>
                  <Select
                    IconComponent={KeyboardArrowDownIcon}
                    id="cancel-appointment-label"
                    labelId="cancel-appointment-label"
                    label={t(Translation.MODAL_APPOINTMENTS_CONFIRM_CANCEL_SELECT_REASON)}
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
            </Grid>

            {openOtherReasonField && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="reason_for_cancellation"
                  multiline
                  name="reason_for_cancellation"
                  rows={4}
                  placeholder={t(Translation.MODAL_APPOINTMENTS_CONFIRM_CANCEL_TEXT_REASON)}
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
                  color="secondary"
                  variant="contained"
                  disabled={!cancellationReason}
                  onClick={onConfirm}
                  sx={{
                    width: '160px',
                    height: '40px'
                  }}
                >
                  {t(Translation.MODAL_APPOINTMENTS_CONFIRM_CANCEL_BUTTON_CONFIRM)}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </DialogActions>
      </Grid>
    </Dialog>
  );
};

export default CancelAppointmentModal;
