import React, { ReactNode } from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Button, ButtonProps, Fab, Grid, SxProps, Typography } from '@mui/material';

export const PlusIconButton = (props: { onClick: () => void }) => {
  const { onClick } = props;

  return (
    <Grid container direction="row-reverse">
      <Grid item>
        <Fab color="secondary" onClick={onClick}>
          <AddRoundedIcon fontSize="medium" />
        </Fab>
      </Grid>
    </Grid>
  );
};

export const MinusIconButton = (props: { onClick: () => void }) => {
  const { onClick } = props;

  return (
    <Grid container direction="row-reverse">
      <Grid item>
        <Button className="minus-icon" onClick={onClick}>
          <RemoveIcon />
        </Button>
      </Grid>
    </Grid>
  );
};

interface ButtonWithIconProps extends ButtonProps {
  onClick?: () => void;
  icon?: ReactNode;
  label: string;
  sx?: SxProps;
}

export const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({ onClick, icon, label, sx, ...buttonProps }) => (
  <Button
    sx={{
      border: '1px solid #BDBDBD',
      borderRadius: 1,
      py: 1.2,
      px: 4,
      display: 'flex',
      ...sx
    }}
    onClick={onClick}
    {...buttonProps}
  >
    <Typography
      sx={{
        fontWeight: 500
      }}
    >
      {label}
    </Typography>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        pl: 1
      }}
    >
      {icon}
    </Box>
  </Button>
);
