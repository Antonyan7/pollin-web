import React, { useCallback, useState } from 'react';
import {
  InternalButton,
  StyledInputLabel,
  StyledSelectButton
} from '@components/Appointments/CommonMaterialComponents';
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
  MenuItem,
  SelectChangeEvent,
  TextField,
  Typography,
  useTheme
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
  const theme = useTheme();

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
                  <CloseOutlined sx={{ color: theme.palette.common.black }} />
                </IconButton>
              </Grid>
            </Grid>
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} style={{ color: theme.palette.common.black }}>
                <Typography sx={{ fontWeight: 400, fontSize: '16px', lineHeight: '20px' }}>
                  Please confirm the reason for the cancellation.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <StyledInputLabel theme={theme} id="cancel-appointment-label">
                    Reason for Cancellation
                  </StyledInputLabel>
                  <StyledSelectButton
                    theme={theme}
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
                  </StyledSelectButton>
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
                  <InternalButton
                    theme={theme}
                    onClick={() => {
                      setOpenAppointmentsModal(false);
                      setOpenOtherReasonField(false);
                    }}
                    sx={{
                      backgroundColor: theme.palette.dark[100],
                      color: theme.palette.common.white,
                      width: '160px',
                      height: '40px'
                    }}
                  >
                    Confirm
                  </InternalButton>
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
