import React from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, Grid, Typography } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { margins } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

const Body = () => {
  const [t] = useTranslation();
  const patientProfile = useAppSelector(patientsSelector.patientProfile);

  const imgSrc = patientProfile?.avatar?.imageURL;

  return (
    <Grid container spacing={1}>
      <Grid container spacing={1} direction="row">
        <Grid item xs={4}>
          <Avatar
            alt={patientProfile?.title}
            src={imgSrc}
            onClick={() =>
              dispatch(
                viewsMiddleware.openModal({
                  name: ModalName.ImageModal,
                  props: {
                    imgSrc,
                    alt: patientProfile?.title
                  }
                })
              )
            }
            sx={{
              borderRadius: '50%',
              width: { xs: 72, sm: 100, md: 140 },
              height: { xs: 72, sm: 100, md: 140 }
            }}
          />
        </Grid>
        <Grid item xs={8}>
          <Grid container justifyContent="center" alignItems="center" spacing={2} marginTop={margins.top12}>
            <Grid item xs={6}>
              <Typography variant="h5" fontWeight={500}>
                {t(Translation.MODAL_VERIFY_PATIENT_PHOTO_NAME)}:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              {patientProfile?.title}
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" fontWeight={500}>
                {t(Translation.MODAL_VERIFY_PATIENT_PHOTO_ID)}:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              {patientProfile?.identifier}
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" fontWeight={500}>
                {t(Translation.MODAL_VERIFY_PATIENT_PHOTO_DATE)}:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              {patientProfile?.dateOfBirth}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Body;
