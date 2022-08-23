import React, { useCallback, useState } from 'react';
import {
  InternalButton,
  StyledInputLabel,
  StyledSelectButton
} from '@components/Appointments/CommonMaterialComponents';
import { CloseOutlined } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
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
        <Box sx={{ width: '500px' }}>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <p>Confirm Cancellation</p>
            <IconButton onClick={() => setOpenAppointmentsModal(false)}>
              <CloseOutlined sx={{ color: theme.palette.common.black }} />
            </IconButton>
          </DialogTitle>
          <Divider sx={{ padding: '10px 0px' }} />
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Typography>Please confirm the reason for the cancellation.</Typography>
            <FormControl>
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
            {openOtherReasonField && (
              <Box>
                <TextField
                  fullWidth
                  id="reason_for_cancellation"
                  multiline
                  name="reason_for_cancellation"
                  rows={4}
                  placeholder="Reason for Cancellation"
                  onChange={(e) => setCancellationReason && setCancellationReason(e.target.value as string)}
                />
              </Box>
            )}
          </DialogContent>
          <Divider sx={{ padding: '10px 0px' }} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <InternalButton
              theme={theme}
              onClick={() => {
                setOpenAppointmentsModal(false);
                setOpenOtherReasonField(false);
              }}
              sx={{
                backgroundColor: theme.palette.dark[100],
                color: theme.palette.common.white,
                margin: '10px 15px'
              }}
            >
              Confirm
            </InternalButton>
          </Box>
        </Box>
      )}
    </Dialog>
  );
};

export default ConfirmAppointmentsModal;
