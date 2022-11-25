import React from 'react';
import { useTranslation } from 'react-i18next';
import { CloseOutlined } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography
} from '@mui/material';
import { Stack } from '@mui/system';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { cancellationReasons } from 'helpers/constants';
import { useAppSelector } from 'redux/hooks';
import { bookingSelector } from 'redux/slices/booking';
import { margins } from 'themes/themeConstants';

import { BaseSelectWithLoading } from '@ui-component/BaseDropdownWithLoading';
import { ButtonWithLoading } from '@ui-component/common/buttons';

import useCancelAppointmentControls from './hooks/useCancelAppointmentControls';
import { CancelAppointmentModalProps } from './types';

const CancelAppointmentModal = ({ appointmentId }: CancelAppointmentModalProps) => {
  const isConfirmationLoading = useAppSelector(bookingSelector.isAppointmentLoading);

  const [t] = useTranslation();
  const { onConfirm, onReasonChange, onClose, onSelectButtonChange, openOtherReasonField, cancellationReason } =
    useCancelAppointmentControls(appointmentId);
  const cancelConfirmSelectReasonLabel = t(Translation.MODAL_APPOINTMENTS_CONFIRM_CANCEL_SELECT_REASON);
  const cancelConfirmButtonLabel = t(Translation.MODAL_APPOINTMENTS_CONFIRM_CANCEL_BUTTON_CONFIRM);

  const cancelConfirmSelectReasonLabelCyId = CypressIds.MODAL_APPOINTMENTS_CONFIRM_CANCEL_SELECT_REASON;
  const cancelConfirmButtonLabelCyId = CypressIds.MODAL_APPOINTMENTS_CONFIRM_CANCEL_BUTTON_CONFIRM;

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
                {t(Translation.MODAL_APPOINTMENTS_CONFIRM_CANCEL_TITLE)}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={onClose} data-cy={CypressIds.MODAL_APPOINTMENTS_CANCEL_CLOSE_ICON}>
                <CloseOutlined />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography> {t(Translation.MODAL_APPOINTMENTS_CONFIRM_CANCEL_DESCRIPTION)}</Typography>
            </Grid>
            <Grid sx={{ marginTop: margins.top20 }} item xs={12}>
              <BaseSelectWithLoading
                IconComponent={KeyboardArrowDownIcon}
                id="cancel-appointment-label"
                labelId="cancel-appointment-label"
                label={cancelConfirmSelectReasonLabel}
                data-cy={cancelConfirmSelectReasonLabelCyId}
                onChange={onSelectButtonChange}
              >
                {cancellationReasons.map((reasonItem) => (
                  <MenuItem value={reasonItem} key={reasonItem.toString()}>
                    {reasonItem}
                  </MenuItem>
                ))}
              </BaseSelectWithLoading>
            </Grid>

            {openOtherReasonField && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="reason_for_cancellation"
                  multiline
                  name="reason_for_cancellation"
                  rows={4}
                  inputProps={{
                    maxLength: 250
                  }}
                  placeholder={t(Translation.MODAL_APPOINTMENTS_CONFIRM_CANCEL_TEXT_REASON)}
                  onChange={onReasonChange}
                />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Grid container>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
                <ButtonWithLoading
                  isLoading={isConfirmationLoading}
                  variant="contained"
                  disabled={!cancellationReason}
                  data-cy={cancelConfirmButtonLabelCyId}
                  onClick={onConfirm}
                  sx={{
                    width: '80px',
                    height: '40px'
                  }}
                >
                  {cancelConfirmButtonLabel}
                </ButtonWithLoading>
              </Stack>
            </Grid>
          </Grid>
        </DialogActions>
      </Grid>
    </Dialog>
  );
};

export default CancelAppointmentModal;
