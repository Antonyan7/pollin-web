import React from 'react';
import { Button, DialogTitle, Grid, Stack, Typography, useTheme } from '@mui/material';

import ViewModal from '@ui-component/Modal/ViewModal';

interface Props {
  title: string;
  data: Record<string, (string | { text: string; subText?: string })[]>;
  onClose?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  open?: boolean;
}

const ObjectViewModal = ({ title, data, onClose, open = true }: Props) => {
  const theme = useTheme();

  const getValueMarkUp = (value: Props['data'][string][number]) => {
    if (typeof value === 'string') {
      return <Typography color={theme.palette.grey[800]}>{value}</Typography>;
    }

    const textJSX = <Typography color={theme.palette.grey[800]}>{value.text}</Typography>;

    if ('subText' in value) {
      return (
        <Stack rowGap={0.25}>
          {textJSX}
          <Typography variant="caption" color={theme.palette.grey[800]}>
            {value.subText}
          </Typography>
        </Stack>
      );
    }

    return textJSX;
  };

  return (
    <ViewModal
      open={open}
      header={
        <DialogTitle
          variant="h2"
          mb={3}
          fontWeight="bold"
          color={theme.palette.common.black}
          textTransform="capitalize"
        >
          {title}
        </DialogTitle>
      }
      onClose={(_e, reason) => {
        if (reason === 'backdropClick') {
          onClose?.();
        }
      }}
      content={
        <Stack spacing={4} px={2.5}>
          {Object.entries(data).map(([key, values]) => (
            <Grid container key={key} rowGap={1.5}>
              {values.map((value, index) => (
                <React.Fragment key={`${key}-${typeof value === 'string' ? value : value.text}`}>
                  <Grid item xs={5}>
                    <Typography fontWeight="bold" color={theme.palette.common.black}>
                      {index === 0 && `${key}:`}
                    </Typography>
                  </Grid>
                  <Grid item container xs={7}>
                    {getValueMarkUp(value)}
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          ))}
        </Stack>
      }
      footer={
        <Button color="primary" variant="contained" disableTouchRipple onClick={onClose}>
          Close
        </Button>
      }
    />
  );
};

export default ObjectViewModal;
