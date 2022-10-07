import React, { SetStateAction, useCallback } from 'react';
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
import { Translation } from 'constants/translations';

export interface DuplicatePatientPopUpProps {
  open: boolean;
  setOnClose: React.Dispatch<SetStateAction<boolean>>;
}

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '20px',
  color: theme.palette.common.black,
  margin: '40px 10px'
}));

const DuplicatePatientPopup = ({ open, setOnClose }: DuplicatePatientPopUpProps) => {
  const theme = useTheme();
  const [t] = useTranslation();
  const onClose = useCallback(() => {
    setOnClose(false);
  }, [setOnClose]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
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
              <StyledButton variant="contained" color="secondary" sx={{ width: '160px' }} onClick={onClose}>
                {t(Translation.PAGE_APPOINTMENTS_DUPLICATE_PATIENT_MODAL_ACTION)}
              </StyledButton>
            </Grid>
          </Grid>
        </DialogActions>
      </Grid>
    </Dialog>
  );
};

export default DuplicatePatientPopup;
