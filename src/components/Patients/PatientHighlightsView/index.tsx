import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import API from '@axios/API';
import patientEmrHelpers from '@axios/patientEmr/patinerEmrHelpers';
import { Collapse, Divider, Grid, Paper, Typography, TypographyProps, useTheme } from '@mui/material';
import { viewsMiddleware } from '@redux/slices/views';
import { dispatch } from 'redux/hooks';
import { patientsMiddleware, patientsSelector, patientsSlice } from 'redux/slices/patients';

import ContactList from '@ui-component/common/ContactList';

const PatientHighlightsView = () => {
  const theme = useTheme();

  const [open, setOpen] = useState(true);

  const patientId = useSelector(patientsSelector.currentPatientId);
  const patientProfile = useSelector(patientsSelector.patientProfile);
  const isPatientHighlightsLoading = useSelector(patientsSelector.isPatientHighlightsDetailsLoading);
  const patientHighlights = useSelector(patientsSelector.patientHighlights);
  const isPatientHighlightIntakeComplete = useSelector(patientsSelector.isPatientHighlightIntakeComplete);

  useEffect(() => {
    if (patientId && !isPatientHighlightsLoading) {
      dispatch(patientsMiddleware.getPatientHighlight(patientId));
    }
  }, [isPatientHighlightsLoading, patientId]);

  useEffect(() => {
    if (patientId) {
      dispatch(patientsMiddleware.getPatientProfile(patientId));
    }

    return () => {
      // Clean previous highlightInTakeComplete status after component unmount
      dispatch(patientsSlice.actions.setIsPatientHighlightIntakeComplete(false));
      dispatch(patientsMiddleware.emptyPatientProfile());
    };
  }, [patientId]);

  const patientHighlightColumns = patientHighlights
    ? [
        patientHighlights.slice(0, Math.ceil(patientHighlights.length / 3)),
        patientHighlights.slice(Math.ceil(patientHighlights.length / 3), 2 * Math.ceil(patientHighlights.length / 3)),
        patientHighlights.slice(2 * Math.ceil(patientHighlights.length / 3))
      ]
    : [[], [], []];

  const onDetailsClick =
    (uiid: string): TypographyProps['onClick'] =>
    async () => {
      const patientHighlightDetails = await API.patients.getPatientHighlightDetails(patientId, uiid);

      if (patientHighlightDetails) {
        const modalParams = patientEmrHelpers.getModalParamsFromPatientHighlightDetails(patientHighlightDetails);

        dispatch(viewsMiddleware.openModal(modalParams));
      }
    };

  return (
    <Paper sx={{ padding: '15px' }}>
      <Grid item xs={12}>
        <ContactList
          avatar={patientProfile?.avatar?.imageURL}
          name={patientProfile?.title}
          date={patientProfile?.subTitle}
          setOpen={setOpen}
          open={open}
          cycleStatus={patientProfile?.cycleStatus}
        />
        <Collapse in={isPatientHighlightIntakeComplete && open} orientation="vertical">
          <Divider />
          <Grid container alignItems="flex-start" py="15px">
            {patientHighlightColumns.map((patientHighlightColumn, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Grid container item xs={12} sm={4} key={index} rowGap={1.5} justifyContent="center">
                {patientHighlightColumn.map(({ uiid, title, items }) => (
                  <React.Fragment key={title}>
                    <Grid item xs={12} sm={4}>
                      <Typography fontWeight={500} color={theme.palette.common.black}>
                        {title}:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} container direction="column" rowGap={0.25}>
                      {items?.map((item) => (
                        <Typography key={item} color={theme.palette.grey[800]}>
                          {item}
                        </Typography>
                      ))}
                      {uiid && (
                        <Typography
                          fontWeight={500}
                          color={theme.palette.common.black}
                          sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                          onClick={onDetailsClick(uiid)}
                        >
                          View Details
                        </Typography>
                      )}
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            ))}
            <Grid item xs={12} sm={0.5} />
          </Grid>
        </Collapse>
      </Grid>
    </Paper>
  );
};

export default PatientHighlightsView;
