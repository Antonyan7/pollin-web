import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Button, CardActions, CardContent, Divider, Grid, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MainCard from 'ui-component/common/MainCard';

export default (props: { handleClose: () => void }) => {
  const { handleClose } = props;
  const theme = useTheme();

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
        title="Error: Overlapping Service Types and Blocks"
        content={false}
        secondary={
          <IconButton size="large">
            <CloseIcon onClick={() => handleClose()} fontSize="small" />
          </IconButton>
        }
      >
        <CardContent>
          <Typography variant="body1">
            One or more of the time periods that have been defined in this template are overlapping and must be updated
            in order to save.
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Please update the following time period(s):
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            <ul>
              <li>
                <b>Time Period 1, Time Period 2 & Time Period 3</b> are partially or completely overlapping
              </li>
            </ul>
          </Typography>
        </CardContent>
        <Divider />
        <CardActions>
          <Grid container justifyContent="flex-end">
            <Button
              sx={{ background: `${theme.palette.grey[700]}` }}
              variant="contained"
              type="button"
              onClick={() => handleClose()}
            >
              Ok
            </Button>
          </Grid>
        </CardActions>
      </MainCard>
    </div>
  );
};
