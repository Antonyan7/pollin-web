import React from 'react';
import { useTranslation } from 'react-i18next';
import bookingHelpers from '@axios/booking/bookingHelpers';
import { PatientAppointmentsFilterOption } from '@axios/booking/managerBookingTypes';
import CloseIcon from '@mui/icons-material/Close';
import { Grid, useTheme } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsSelector, patientsSlice } from '@redux/slices/patients';
import * as Sentry from '@sentry/nextjs';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { borderRadius, borders } from 'themes/themeConstants';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

const { setPatientAppointments, setError } = patientsSlice.actions;

const AppointmentListFilter = () => {
  const theme = useTheme();
  const [t] = useTranslation();
  const isAppointmentFiltersLoading = useAppSelector(patientsSelector.isPatientAppointmentFiltersLoading);
  const { list, orderBy, order, filters, selectedFilters } = useAppSelector(patientsSelector.patientAppointments);
  const { currentPage } = list;
  const currentPatientAppointmentFilterField = useAppSelector(patientsSelector.currentPatientAppointmentFilterField);

  const router = useRouter();

  const adaptedGroupedOptions = () =>
    filters && filters.length > 0
      ? filters?.flatMap((item) => item?.options.map((option) => ({ ...option, type: item.title })))
      : [];

  const onAppointmentRecencyChange = async (appointmentFilters: PatientAppointmentsFilterOption[]) => {
    try {
      const { data, ...metaData } = await bookingHelpers.getAppointmentsListFromParams({
        page: currentPage,
        order,
        orderBy,
        filters: appointmentFilters?.map(({ id, type }) => ({ id, type }))
      });

      router.replace(
        {
          query: {
            ...router.query,
            filterIds: appointmentFilters.map(({ id }) => id)
          }
        },
        undefined,
        { scroll: false }
      );

      dispatch(
        setPatientAppointments({
          list: {
            appointments: data.appointments,
            currentPage: metaData.currentPage,
            pageSize: metaData.pageSize,
            totalItems: metaData.totalItems
          },
          order,
          orderBy,
          selectedFilters: appointmentFilters
        })
      );
    } catch (error) {
      Sentry.captureException(error);
      dispatch(setError(error));
    }
  };

  return (
    <Grid item xs={12}>
      <BaseDropdownWithLoading
        id="appointmentFilterId"
        fullWidth
        multiple
        isLoading={isAppointmentFiltersLoading}
        ListboxProps={{
          style: {
            maxHeight: 260,
            borderRadius: borderRadius.radius8,
            border: `${borders.solid2px} ${theme.palette.primary.main}`
          }
        }}
        onChange={(_event, appointmentFilters) =>
          onAppointmentRecencyChange(
            appointmentFilters.filter(
              (appointmentFilter): appointmentFilter is PatientAppointmentsFilterOption =>
                typeof appointmentFilter === 'object'
            )
          )
        }
        getOptionDisabled={(option) => {
          if (option && selectedFilters.length > 0) {
            return !!selectedFilters.find((item) => item.type === option.type);
          }

          return false;
        }}
        value={[...selectedFilters]}
        options={adaptedGroupedOptions()}
        groupBy={(option) => option.type}
        getOptionLabel={(option) => (typeof option === 'object' ? option.title : option)}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        clearIcon={<CloseIcon onClick={() => onAppointmentRecencyChange([])} fontSize="small" />}
        renderInputProps={{
          label: t(Translation.PAGE_PATIENT_LIST_FIELD_FILTERS),
          name: currentPatientAppointmentFilterField
        }}
      />
    </Grid>
  );
};

export default AppointmentListFilter;
