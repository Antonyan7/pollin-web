import React, { ReactNode } from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveIcon from '@mui/icons-material/Remove';
import { LoadingButton } from '@mui/lab';
import { Box, Button, ButtonProps, CircularProgress, Fab, Grid, SxProps, Typography } from '@mui/material';
import { borderRadius, paddings } from 'themes/themeConstants';

export const PlusIconButton = (props: { isPlusButtonDisabled?: boolean; onClick: () => void; dataCy?: string }) => {
  const { onClick, isPlusButtonDisabled, dataCy } = props;

  return (
    <Grid container direction="row-reverse">
      <Grid item>
        <Fab data-cy={dataCy ?? ''} disabled={isPlusButtonDisabled} color="primary" onClick={onClick}>
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
  handleClick?: (event: React.MouseEvent<HTMLElement>) => void;
  icon?: ReactNode;
  label: string;
  sx?: SxProps;
  labelSx?: SxProps;
}

export const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  onClick,
  handleClick,
  icon,
  label,
  labelSx,
  sx,
  ...buttonProps
}) => (
  <Button
    sx={{
      borderRadius: 1,
      py: 1.2,
      px: 4,
      display: 'flex',
      ...sx
    }}
    onClick={handleClick ?? onClick}
    {...buttonProps}
  >
    <Typography
      sx={{
        fontWeight: 400,
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
  dataCy?: string;
}

export const ButtonWithLoading = ({ isLoading = false, dataCy, ...otherProps }: ButtonWithLoadingProps) => (
  <LoadingButton
    variant="contained"
    {...otherProps}
    {...(dataCy && {
      'data-cy': dataCy
    })}
    loading={isLoading}
    {...(isLoading && {
      endIcon: <CircularProgress size={16} color="inherit" />,
      loadingPosition: 'end'
    })}
    sx={{
      textTransform: 'none',
      color: (theme) => theme.palette.common.white,
      background: (theme) => theme.palette.primary.main,
      minWidth: '100px',
      px: 2,
      textAlign: 'left',
      borderRadius: borderRadius.radius8,
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
