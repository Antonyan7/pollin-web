import React, { useEffect, useRef } from 'react';
import bookingManager from '@axios/booking/bookingManager';
import { IPatientAppointment } from '@axios/booking/managerBookingTypes';
import { Divider, Grid, Stack } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsSelector, patientsSlice } from '@redux/slices/patients';
import { useRouter } from 'next/router';
import { SortOrder } from 'types/patient';
import { AppointmentResponseStatus, GroupedFiltersOption } from 'types/reduxTypes/patient-emrStateTypes';

import AppointmentsListHeader from '@ui-component/profile/AppointmentListHeader';
import AppointmentsListFilter from '@ui-component/profile/AppointmentsListFilter';
import AppointmentsListTable from '@ui-component/profile/AppointmentsListTable';

import { usePatientProfileNavigatorContext } from '../../context/PatientProfileNavigatorContext';
import { PatientProfilePageName } from '../../context/types/PatientProfileNavigatorContextTypes';

const {
  setPatientAppointmentsOrderBy,
  setPatientAppointmentsOrder,
  setPatientAppointmentsListPage,
  setPatientAppointmentsFilters,
  setPatientAppointmentsSelectedFilters,
  setPatientAppointmentsFiltersLoading,
  setPatientAppointmentsRequestStatus
} = patientsSlice.actions;

const isValidSortOrder = (orderString?: string): orderString is SortOrder =>
  ([SortOrder.Asc, SortOrder.Desc] as string[]).includes(orderString ?? '');
const isValidHeaderCell = (key?: string): key is Exclude<keyof IPatientAppointment, 'time'> =>
  ['type', 'date', 'status'].includes(key ?? '');

const AppointmentsList = () => {
  const router = useRouter();
  const { profilePageName } = usePatientProfileNavigatorContext();
  const filtersShouldLoad = useRef(false);

  const { list, orderBy, order, status, selectedFilters } = useAppSelector(patientsSelector.patientAppointments);
  const isPatientAppointmentFiltersLoading = useAppSelector(patientsSelector.isPatientAppointmentFiltersLoading);
  const { currentPage } = list;

  useEffect(() => {
    if (profilePageName === PatientProfilePageName.AppointmentsList) {
      filtersShouldLoad.current = true;
    } else if (profilePageName === null) {
      dispatch(setPatientAppointmentsFilters(null));
      dispatch(setPatientAppointmentsSelectedFilters([]));
    }
  }, [profilePageName]);

  useEffect(() => {
    if (filtersShouldLoad.current && !isPatientAppointmentFiltersLoading) {
      filtersShouldLoad.current = false;
      dispatch(setPatientAppointmentsListPage(1));
      dispatch(setPatientAppointmentsFiltersLoading(true));
      bookingManager
        .getAppointmentListFilters()
        .then(({ data }) => {
          dispatch(setPatientAppointmentsFilters(data.filters));

          const queryFilterIds =
            typeof router.query.filterIds === 'string' ? [router.query.filterIds] : router.query.filterIds ?? [];

          const querySelectedFilters: GroupedFiltersOption[] = data.filters.flatMap(({ options, type, title }) =>
            options
              .filter(({ id }) => queryFilterIds.includes(id))
              .map((option) => ({ ...option, type, groupTitle: title }))
          );

          dispatch(setPatientAppointmentsSelectedFilters(querySelectedFilters));
        })
        .catch(() => dispatch(setPatientAppointmentsFilters([])))
        .finally(() => {
          dispatch(setPatientAppointmentsFiltersLoading(false));

          const queryOrder = Array.isArray(router.query.order) ? router.query.order[0] : router.query.order;
          const queryOrderBy = Array.isArray(router.query.orderBy) ? router.query.orderBy[0] : router.query.orderBy;
          const queryPage = Number((Array.isArray(router.query.page) ? router.query.page[0] : router.query.page) ?? 0);

          if (isValidSortOrder(queryOrder) && queryOrder !== order) {
            dispatch(setPatientAppointmentsOrder(queryOrder));
          }

          if (isValidHeaderCell(queryOrderBy) && queryOrderBy !== orderBy) {
            dispatch(setPatientAppointmentsOrderBy(queryOrderBy));
          }

          if (queryPage + 1 !== currentPage) {
            dispatch(setPatientAppointmentsListPage(queryPage + 1));
          }
        });
    }
  }, [currentPage, isPatientAppointmentFiltersLoading, order, orderBy, profilePageName, router]);

  useEffect(() => {
    if (status !== AppointmentResponseStatus.IDLE) {
      if (status === AppointmentResponseStatus.SUCCESS) {
        router.replace(
          {
            query: {
              ...router.query,
              filterIds: selectedFilters.map(({ id }) => id),
              page: Math.max(0, currentPage - 1),
              order,
              orderBy
            }
          },
          undefined,
          { scroll: false }
        );
      }

      dispatch(setPatientAppointmentsRequestStatus(AppointmentResponseStatus.IDLE));
    }
  }, [currentPage, order, orderBy, router, selectedFilters, status]);

  return (
    <Stack rowGap={1.5}>
      <AppointmentsListHeader />
      <Divider />
      <Grid container xs={12}>
        <AppointmentsListFilter />
      </Grid>
      <AppointmentsListTable />
    </Stack>
  );
};

export default AppointmentsList;
