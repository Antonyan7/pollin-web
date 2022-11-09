import React, { ReactNode } from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveIcon from '@mui/icons-material/Remove';
import { LoadingButton } from '@mui/lab';
import { Box, Button, ButtonProps, Fab, Grid, SxProps, Typography } from '@mui/material';
import { paddings } from 'themes/themeConstants';

export const PlusIconButton = (props: { onClick: () => void }) => {
  const { onClick } = props;

  return (
    <Grid container direction="row-reverse">
      <Grid item>
        <Fab color="primary" onClick={onClick}>
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
  labelSx?: SxProps;
}

export const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  onClick,
  icon,
  label,
  labelSx,
  sx,
  ...buttonProps
}) => (
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
        fontWeight: 500,
        ...labelSx
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

interface ButtonWithLoadingProps extends ButtonProps {
  isLoading: boolean;
}

export const ButtonWithLoading = ({ isLoading = false, ...otherProps }: ButtonWithLoadingProps) => (
  <LoadingButton
    loadingPosition="end"
    variant="contained"
    {...otherProps}
    loading={isLoading}
    sx={{
      textTransform: 'none',
      color: (theme) => theme.palette.common.white,
      background: (theme) => theme.palette.primary.main,
      minWidth: '100px',
      px: 2,
      textAlign: 'left',
      '&.MuiButton-root.MuiLoadingButton-root.Mui-disabled': {
        color: (theme) => theme.palette.common.white,
        background: (theme) => theme.palette.grey[300]
      },
      '&.MuiButtonBase-root.MuiButton-root.MuiLoadingButton-root.MuiButton-sizeSmall': {
        py: paddings.bottom8
      },
      '&.MuiButtonBase-root.MuiButton-root.MuiLoadingButton-root.MuiButton-sizeMedium': {
        py: paddings.bottom12
      },
      '&.MuiButtonBase-root.MuiButton-root.MuiLoadingButton-root.MuiButton-sizeLarge': {
        py: paddings.bottom16
      },
      ...otherProps?.sx
    }}
  >
    {otherProps?.children}
  </LoadingButton>
);
