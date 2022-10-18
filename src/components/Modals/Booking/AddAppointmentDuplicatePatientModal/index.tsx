import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledButton } from '@components/Appointments/CommonMaterialComponents';
import { CloseOutlined } from '@mui/icons-material';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  styled,
  Typography,
  useTheme
} from '@mui/material';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { bookingMiddleware } from 'redux/slices/booking';
import { margins, paddings } from 'themes/themeConstants';

export interface AddAppointmentDuplicatePatientModalProps {
  patientId: string;
}

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '20px',
  color: theme.palette.common.black,
  margin: `${margins.topBottom40} ${margins.leftRight12}`
}));

const AddAppointmentDuplicatePatientModal = ({ patientId }: AddAppointmentDuplicatePatientModalProps) => {
  const theme = useTheme();
  const router = useRouter();
  const [t] = useTranslation();
  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.closeAllModals());
    dispatch(bookingMiddleware.getPatientAlerts());
  }, []);

  const onProfileClick = useCallback(() => {
    onClose();
    router.push(`/patient-emr/details/${patientId}/profile`);
  }, [onClose, patientId, router]);

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <Grid>
        <DialogTitle sx={{ padding: `${paddings.top24} ${paddings.right24} ${paddings.bottom0} ${paddings.left32}` }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h3">{t(Translation.PAGE_APPOINTMENTS_DUPLICATE_PATIENT_MODAL_TITLE)}</Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={onClose}>
                <CloseOutlined />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent sx={{ padding: `${paddings.top0} ${paddings.right24} ${paddings.bottom0} ${paddings.left24}` }}>
          <Grid container direction="column" spacing={3} sx={{ whiteSpace: 'pre-line' }}>
            <Grid item>
              <StyledTypography theme={theme}>
                {t(Translation.PAGE_APPOINTMENTS_DUPLICATE_PATIENT_MODAL_CONTENT)}
              </StyledTypography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ padding: `${paddings.top0} ${paddings.right24} ${paddings.bottom24} ${paddings.left24}` }}>
          <Grid container justifyContent="flex-end">
            <Grid>
              <StyledButton variant="contained" sx={{ width: '160px' }} onClick={onProfileClick}>
                {t(Translation.PAGE_APPOINTMENTS_DUPLICATE_PATIENT_MODAL_ACTION)}
              </StyledButton>
            </Grid>
          </Grid>
        </DialogActions>
      </Grid>
    </Dialog>
  );
};

export default AddAppointmentDuplicatePatientModal;
