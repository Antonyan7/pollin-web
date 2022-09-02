import React, { useCallback, useState } from 'react';
import { StyledButton } from '@components/Appointments/CommonMaterialComponents';
import { CloseOutlined } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material';
import { Stack } from '@mui/system';
import { cancellationReason } from 'helpers/constants';

import { AppointmentsModalProps } from '../../types/appointments';

const ConfirmAppointmentsModal = ({
  openAppointmentsModal,
  onCloseAppointmentsModal,
  setOpenAppointmentsModal,
  setCancellationReason
}: AppointmentsModalProps) => {
  const [openOtherReasonField, setOpenOtherReasonField] = useState<boolean>(false);

  const onSelectButtonChange = useCallback(
    (event: SelectChangeEvent<unknown>) =>
      event.target.value === cancellationReason[cancellationReason.length - 1]
        ? setOpenOtherReasonField(true)
        : setCancellationReason && setCancellationReason('Reason Of the cancellation is the timing'),
    [setCancellationReason]
  );

  return (
    <Dialog open={openAppointmentsModal} onClose={onCloseAppointmentsModal}>
      {openAppointmentsModal && (
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
                <IconButton
                  onClick={() => {
                    setOpenAppointmentsModal(false);
                    setOpenOtherReasonField(false);
                  }}
                >
                  <CloseOutlined />
                </IconButton>
              </Grid>
            </Grid>
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h5">Please confirm the reason for the cancellation.</Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="cancel-appointment-label">Reason for Cancellation</InputLabel>
                  <Select
                    IconComponent={KeyboardArrowDownIcon}
                    id="cancel-appointment-label"
                    labelId="cancel-appointment-label"
                    label="Reason for Cancellation"
                    onChange={onSelectButtonChange}
                  >
                    {cancellationReason.map((reasonItem) => (
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
                    onChange={(e) => setCancellationReason && setCancellationReason(e.target.value as string)}
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
                  <StyledButton
                    variant="contained"
                    onClick={() => {
                      setOpenAppointmentsModal(false);
                      setOpenOtherReasonField(false);
                    }}
                    sx={{
                      width: '160px',
                      height: '40px'
                    }}
                  >
                    Confirm
                  </StyledButton>
                </Stack>
              </Grid>
            </Grid>
          </DialogActions>
        </Grid>
      )}
    </Dialog>
  );
};

export default ConfirmAppointmentsModal;
