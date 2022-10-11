import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledButton } from '@components/Appointments/CommonMaterialComponents';
import { CloseOutlined } from '@mui/icons-material';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  styled,
  Typography,
  useTheme
} from '@mui/material';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { ModalName } from 'constants/modals';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';

export interface AddAppointmentDuplicatePatientModalProps {
  patientId: string;
}

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '20px',
  color: theme.palette.common.black,
  margin: '40px 10px'
}));

const AddAppointmentDuplicatePatientModal = ({ patientId }: AddAppointmentDuplicatePatientModalProps) => {
  const theme = useTheme();
  const [t] = useTranslation();
  const router = useRouter();
  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.closeModal(ModalName.AddAppointmentDuplicatePatientModal));
  }, []);

  const onProfileClick = useCallback(() => {
    onClose();
    router.push(`/patients-emr/details/${patientId}/profile`);
  }, [onClose, patientId, router]);

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <Grid>
        <DialogTitle sx={{ p: 4 }}>
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
        <Divider />
        <DialogContent sx={{ p: 4 }}>
          <Grid container direction="column" spacing={3} sx={{ whiteSpace: 'pre-line' }}>
            <Grid item>
              <StyledTypography theme={theme}>
                {t(Translation.PAGE_APPOINTMENTS_DUPLICATE_PATIENT_MODAL_CONTENT)}
              </StyledTypography>
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 4 }}>
          <Grid container justifyContent="flex-end">
            <Grid>
              <StyledButton variant="contained" color="secondary" sx={{ width: '160px' }} onClick={onProfileClick}>
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
