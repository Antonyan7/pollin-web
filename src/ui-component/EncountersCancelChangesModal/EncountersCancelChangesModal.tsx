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
import { ModalName } from 'constants/modals';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { dispatch, useAppSelector } from 'redux/hooks';
import { viewsMiddleware, viewsSelector } from 'redux/slices/views';

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '20px',
  color: theme.palette.common.black
}));

const EncountersCancelChangesModal = () => {
  const theme = useTheme();
  const [t] = useTranslation();
  const router = useRouter();
  const modal = useAppSelector(viewsSelector.modal);
  const shouldOpenModal = modal.name === ModalName.EncountersCancelChangesModal && modal.props?.open === true;
  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.setModalState({ name: ModalName.NONE, props: {} }));
  }, []);

  const onConfirm = () => {
    onClose();

    const backTo = router.asPath.split('/').slice(0, 4).join('/');

    router.push(backTo);
  };

  return (
    <Dialog open={shouldOpenModal} onClose={onClose} fullWidth maxWidth="sm">
      <Grid>
        <DialogTitle sx={{ p: 4 }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h3">{t(Translation.PAGE_PATIENT_ENCOUNTERS_MODAL_TITLE)}</Typography>
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
              <StyledTypography theme={theme}>{t(Translation.PAGE_PATIENT_ENCOUNTERS_MODAL_SUBTITLE)}</StyledTypography>
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 4 }}>
          <Grid container justifyContent="flex-end">
            <Grid>
              <StyledButton variant="contained" sx={{ width: '160px' }} onClick={onConfirm}>
                {t(Translation.MODAL_APPOINTMENTS_CONFIRM_CANCEL_BUTTON_CONFIRM)}
              </StyledButton>
            </Grid>
          </Grid>
        </DialogActions>
      </Grid>
    </Dialog>
  );
};

export default EncountersCancelChangesModal;
