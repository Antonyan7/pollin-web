import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  CardActions,
  CardContent,
  CardProps,
  Divider,
  Grid,
  IconButton,
  Modal,
  SelectProps,
  styled,
  Typography
} from '@mui/material';
import { dispatch } from 'redux/hooks';
import { schedulingMiddleware } from 'redux/slices/scheduling';
import MainCard from 'ui-component/cards/MainCard';

interface BodyProps extends CardProps {
  handleOpenClose?: () => void;
  selected: string[];
}
interface SimpleModalProps {
  buttonVal: React.ReactNode;
  handleOpenClose: () => void;
  open: boolean;
  selected: string[];
}

const StyledMainCard = styled(Button)<SelectProps>(() => ({
  textAlign: 'left',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
}));

const Body = React.forwardRef(({ handleOpenClose, selected }: BodyProps, ref: React.Ref<HTMLDivElement>) => {
  const handleConfirm = () => {
    dispatch(schedulingMiddleware.deleteTemplate(selected));
    handleOpenClose?.();
  };

  return (
    <div ref={ref} tabIndex={-1}>
      <StyledMainCard>
        <MainCard
          title="Confirm Template Deletion"
          content={false}
          secondary={
            <IconButton onClick={handleOpenClose} size="large">
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          <CardContent>
            <Typography variant="body1">Are you sure you want to delete the selected template(s)?</Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Please note that this action is permanent and cannot be undone.
            </Typography>
          </CardContent>
          <Divider />
          <CardActions>
            <Grid container justifyContent="flex-end">
              <Button variant="contained" type="button" onClick={handleConfirm}>
                Confirm
              </Button>
            </Grid>
          </CardActions>
        </MainCard>
      </StyledMainCard>
    </div>
  );
});

const RemoveTemplatesModal = ({ buttonVal, handleOpenClose, open, selected }: SimpleModalProps) => (
  <Grid container justifyContent="flex-end">
    {buttonVal}
    <Modal
      open={open}
      onClose={handleOpenClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Body handleOpenClose={handleOpenClose} selected={selected} />
    </Modal>
  </Grid>
);

export default RemoveTemplatesModal;
