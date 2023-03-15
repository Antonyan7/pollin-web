import React from 'react';
import { useTranslation } from 'react-i18next';
import Table from '@components/CheckIn/CheckInTable';
import NoResultsFound from '@components/NoResultsFound';
import { Box, Divider, Grid, TableContainer, Typography, useTheme } from '@mui/material';

import CircularLoading from '@ui-component/circular-loading';
import { ButtonWithLoading } from '@ui-component/common/buttons';

import { Translation } from '../../constants/translations';
import { margins, paddings } from '../../themes/themeConstants';

const AppointmentsTableField = ({
  isAppointmentsLoading,
  isCheckInButtonVisible,
  isCheckInLoading,
  isCheckInButtonDisabled,
  isNoResultsFound
}: {
  isAppointmentsLoading: boolean;
  isCheckInButtonVisible: boolean;
  isCheckInLoading: boolean;
  isCheckInButtonDisabled: boolean;
  isNoResultsFound: boolean;
}) => {
  const [t] = useTranslation();
  const theme = useTheme();

  return (
    <Box sx={{ marginTop: margins.top24 }}>
      <Box
        sx={{
          border: `1px solid ${theme.palette.primary.light}`,
          borderRadius: '10px',
          paddingBottom: isCheckInButtonVisible ? paddings.bottom12 : paddings.bottom0
        }}
      >
        <Grid sx={{ height: '40px' }} container alignItems="center">
          <Grid ml={margins.left24} alignItems="center" item>
            <Typography variant="h5">{t(Translation.PAGE_PATIENT_CHECK_IN_APPOINTMENTS_NAME)}</Typography>
          </Grid>
        </Grid>
        <Divider />
        {isAppointmentsLoading ? (
          <CircularLoading />
        ) : (
          <TableContainer>
            <Table />
          </TableContainer>
        )}
        {isNoResultsFound && <NoResultsFound />}
        <Grid justifyContent="flex-end" container>
          <Grid display="flex" justifyContent="center" item xs={2}>
            {isCheckInButtonVisible ? (
              <ButtonWithLoading
                isLoading={isCheckInLoading}
                sx={{
                  mt: margins.top12,
                  py: paddings.topBottom12,
                  px: paddings.leftRight24
                }}
                disabled={isCheckInButtonDisabled}
                color="primary"
                variant="contained"
                type="submit"
              >
                {t(Translation.COMMON_BUTTON_CONFIRM_LABEL)}
              </ButtonWithLoading>
            ) : null}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AppointmentsTableField;
