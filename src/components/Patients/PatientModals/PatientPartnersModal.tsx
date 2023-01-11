import React, { useCallback } from 'react';
import { IPatientPartnerData } from '@axios/patientEmr/managerPatientEmrTypes';
import LaunchIcon from '@mui/icons-material/Launch';
import { Button, DialogProps, DialogTitle, Grid, Stack, Typography, useTheme } from '@mui/material';
import MuiLink from '@mui/material/Link';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import Link from 'next/link';
import { ModalName } from 'types/modals';

import ViewModal from '@ui-component/Modal/ViewModal';

export interface PatientPartnersModalProps {
  title: string;
  data: Record<string, IPatientPartnerData | string[]>;
}

const PatientPartnersModal = ({ title, data }: PatientPartnersModalProps) => {
  const theme = useTheme();

  const onClose = useCallback(() => dispatch(viewsMiddleware.closeModal(ModalName.PatientPartnersModal)), []);
  const closeOnOutsideClick = useCallback<NonNullable<DialogProps['onClose']>>(
    (_e, reason) => {
      if (reason === 'backdropClick') {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <ViewModal
      onClose={closeOnOutsideClick}
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
      content={
        <Stack spacing={4} px={2.5}>
          <Grid container rowGap={1.5}>
            {Object.entries(data).map(([fieldName, fieldValue]) => (
              <React.Fragment key={fieldName}>
                <Grid item xs={4} sx={{ fontWeight: 'bold', color: theme.palette.common.black }}>
                  {fieldName}:
                </Grid>
                <Grid container item xs={8} sx={{ color: theme.palette.grey[800] }}>
                  {Array.isArray(fieldValue) ? (
                    fieldValue.map((value) => (
                      <Grid
                        container
                        item
                        xs={12}
                        rowGap={0.25}
                        sx={{ color: theme.palette.grey[800] }}
                        key={`${fieldName}-${value}`}
                      >
                        <Grid item xs={1} />
                        <Grid item xs={11}>
                          {value}
                        </Grid>
                      </Grid>
                    ))
                  ) : (
                    <Stack rowGap={0.25} sx={{ color: theme.palette.grey[800] }} flexGrow={1}>
                      <Grid container item xs={12} alignItems="start" justifyContent="flex-end">
                        <Grid item xs={1}>
                          {fieldValue.patientId && (
                            <MuiLink
                              href={`/patient-emr/details/${fieldValue.patientId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <LaunchIcon fontSize="small" sx={{ height: '1.125rem', cursor: 'pointer' }} />
                            </MuiLink>
                          )}
                        </Grid>
                        <Grid item container xs={11} columnGap={0.5} alignItems="start">
                          {fieldValue.patientId ? (
                            <Link href={`/patient-emr/details/${fieldValue.patientId}`} onClick={onClose}>
                              <Typography fontWeight="bolder" align="justify" margin="unset" display="inline">
                                <u>{fieldValue.name}</u>
                              </Typography>
                            </Link>
                          ) : (
                            <Typography
                              fontWeight="bolder"
                              align="justify"
                              margin="unset"
                              display="inline"
                              sx={{ cursor: 'pointer' }}
                            >
                              {fieldValue.name}
                            </Typography>
                          )}

                          <Typography fontWeight="normal" display="inline">
                            {fieldValue.pronoun && `(${fieldValue.pronoun})`}
                          </Typography>
                        </Grid>
                        <Grid item container xs={11} columnGap={0.5} alignItems="start">
                          <Typography
                            variant="caption"
                            fontWeight="normal"
                            display="inline"
                            color={theme.palette.grey[800]}
                          >
                            {fieldValue.subTitle}
                          </Typography>
                        </Grid>
                        <Grid item container xs={11} columnGap={0.5} alignItems="start">
                          <Typography
                            variant="caption"
                            fontWeight="normal"
                            display="inline"
                            color={theme.palette.grey[800]}
                          >
                            {fieldValue.relation}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Stack>
                  )}
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Stack>
      }
      footer={
        <>
          <Button color="primary" variant="outlined" disableTouchRipple>
            Edit
          </Button>
          <Button color="primary" variant="contained" disableTouchRipple onClick={onClose}>
            Close
          </Button>
        </>
      }
    />
  );
};

export default PatientPartnersModal;
