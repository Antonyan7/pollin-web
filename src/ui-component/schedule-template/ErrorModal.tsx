import React from 'react';
import { StyledButton } from '@components/Appointments/CommonMaterialComponents';
import CloseIcon from '@mui/icons-material/Close';
import { CardActions, CardContent, Divider, Grid, IconButton, Typography } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { viewsSelector } from '@redux/slices/views';
import MainCard from 'ui-component/common/MainCard';

export default (props: { handleClose: () => void }) => {
  const { handleClose } = props;
  const { title, message } = useAppSelector(viewsSelector.modal).props;

  const getModalStyle = () => {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
    };
  };

  return (
    <div tabIndex={-1}>
      <MainCard
        style={getModalStyle()}
        title={title}
        content={false}
        secondary={
          <IconButton onClick={() => handleClose()} size="large">
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <CardContent>
          <Typography variant="body1">
            <div dangerouslySetInnerHTML={{ __html: message }} />
          </Typography>
        </CardContent>
        <Divider />
        <CardActions>
          <Grid container justifyContent="flex-end">
            <StyledButton variant="contained" type="button" onClick={() => handleClose()}>
              Ok
            </StyledButton>
          </Grid>
        </CardActions>
      </MainCard>
    </div>
  );
};
