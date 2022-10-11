import React, { useCallback } from 'react';
import { StyledButton } from '@components/Appointments/CommonMaterialComponents';
import CloseIcon from '@mui/icons-material/Close';
import { CardActions, CardContent, Divider, Grid, IconButton, Modal, Typography } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { ModalName } from 'constants/modals';
import HTMLReactParser from 'html-react-parser';
import MainCard from 'ui-component/common/MainCard';

export interface ScheduleTemplatesErrorModalProps {
  title: string;
  message: string;
}

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
};

const ScheduleTemplatesErrorModal = ({ title, message }: ScheduleTemplatesErrorModalProps) => {
  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.closeModal(ModalName.ScheduleTemplatesErrorModal));
  }, []);

  return (
    <Modal open onClose={onClose}>
      <div tabIndex={-1}>
        <MainCard
          style={getModalStyle()}
          title={title}
          content={false}
          secondary={
            <IconButton onClick={onClose} size="large">
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          <CardContent>
            <Typography variant="body1">{HTMLReactParser(message)}</Typography>
          </CardContent>
          <Divider />
          <CardActions>
            <Grid container justifyContent="flex-end">
              <StyledButton variant="contained" type="button" onClick={onClose}>
                Ok
              </StyledButton>
            </Grid>
          </CardActions>
        </MainCard>
      </div>
    </Modal>
  );
};

export default ScheduleTemplatesErrorModal;
