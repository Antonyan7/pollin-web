import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledButton } from '@components/common/MaterialComponents';
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
import { ConfirmationPaths } from 'constants/confirmationModalPaths';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { dispatch } from 'redux/hooks';
import { viewsMiddleware } from 'redux/slices/views';
import { ModalName } from 'types/modals';

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '20px',
  color: theme.palette.common.black
}));

export interface IEncountersCancelChangesModalProps {
  title: string;
  message: string;
}

const EncountersCancelChangesModal = () => {
  const theme = useTheme();
  const [t] = useTranslation();
  const router = useRouter();

  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.closeModal(ModalName.EncountersCancelChangesModal));
  }, []);

  const onConfirm = () => {
    onClose();

    let backTo = router.asPath.split('/').slice(0, 7).join('/');

    if (router.asPath.includes(ConfirmationPaths.Add_Note)) {
      const toEncountersList = router.asPath.split('/').slice(0, 4).join('/');

      backTo = `${toEncountersList}/encounters`;
    }

    router.push(backTo);
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
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
        <DialogContent sx={{ p: 4 }}>
          <Grid container gap={2}>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <StyledTypography theme={theme}>
                  {t(Translation.PAGE_PATIENT_ENCOUNTERS_MODAL_SUBTITLE_FIRST)}
                </StyledTypography>
              </Grid>
            </Grid>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <StyledTypography theme={theme}>
                  {t(Translation.PAGE_PATIENT_ENCOUNTERS_MODAL_SUBTITLE_SECOND)}
                </StyledTypography>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 4 }}>
          <Grid container justifyContent="flex-end">
            <Grid>
              <StyledButton variant="contained" sx={{ width: '70px' }} onClick={onConfirm}>
                {t(Translation.PAGE_ENCOUNTERS_CANCEL_CHANGES_BUTTON)}
              </StyledButton>
            </Grid>
          </Grid>
        </DialogActions>
      </Grid>
    </Dialog>
  );
};

export default EncountersCancelChangesModal;
