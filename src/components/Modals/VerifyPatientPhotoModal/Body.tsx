import React from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, Grid, Typography } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { format } from 'date-fns';
import { UTC_TIMEZONE } from 'helpers/constants';
import { margins } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import { convertTZ } from '@utils/dateUtils';

const Body = () => {
  const [t] = useTranslation();
  const patientProfile = useAppSelector(patientsSelector.patientProfile);
  const getDateOfBirth = (date: string) => {
    if (date) {
      const dateOfBirth = convertTZ(date, UTC_TIMEZONE) as Date;
      const patientAge = new Date().getFullYear() - dateOfBirth.getFullYear();

      return `${format(dateOfBirth, 'MMM dd, yyyy')} (${patientAge} ${t(
        Translation.PAGE_PATIENT_CHECK_IN_VERIFY_MODAL_YEARS
      )})`;
    }

    return '';
  };

  const imgSrc = patientProfile?.avatar?.imageURL;

  return (
    <Grid container spacing={1}>
      <Grid container spacing={1} direction="row">
        <Grid item xs={4}>
          <Avatar
            alt={patientProfile?.fullName}
            src={imgSrc}
            onClick={() =>
              dispatch(
                viewsMiddleware.openModal({
                  name: ModalName.ImageModal,
                  props: {
                    imgSrc,
                    alt: patientProfile?.fullName
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
              {patientProfile?.fullName} {patientProfile?.pronoun} - {patientProfile?.identifier}
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
              {getDateOfBirth(patientProfile?.dateOfBirth ?? '')}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Body;
