import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import bookingManager from '@axios/booking/bookingManager';
import { IPatientAppointmentsListFilter, PatientAppointmentsFilterOptions } from '@axios/booking/managerBookingTypes';
import CloseIcon from '@mui/icons-material/Close';
import { Grid, useTheme } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { borderRadius, borders } from 'themes/themeConstants';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

const AppointmentListFilter = () => {
  const theme = useTheme();
  const [t] = useTranslation();
  const { list, orderBy, order } = useAppSelector(patientsSelector.patientAppointments);
  const { currentPage } = list;
  const currentPatientAppointmentFilterField = useAppSelector(patientsSelector.currentPatientAppointmentFilterField);

  const [filters, setFilters] = useState<IPatientAppointmentsListFilter[]>([]);
  const [isAppointmentFiltersLoading, setIsAppointmentFiltersLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<PatientAppointmentsFilterOptions[]>([]);

  const adaptedGroupedOptions = () =>
    filters?.flatMap((item) => item?.options.map((option) => ({ ...option, type: item.title })));

  useEffect(() => {
    if (!filters.length) {
      setIsAppointmentFiltersLoading(true);
      bookingManager.getAppointmentListFilters().then(({ data }) => {
        setFilters(data.filters);
      });
      setIsAppointmentFiltersLoading(false);
    }
  }, [filters.length]);

  const onAppointmentRecencyChange = (appointmentFilters: PatientAppointmentsFilterOptions[]) => {
    const excludeTitleFilters = appointmentFilters.map(({ id, type }) => ({ id, type }));

    setSelectedFilters(appointmentFilters);

    if (excludeTitleFilters.length) {
      dispatch(patientsMiddleware.getPatientAppointments(currentPage, order, orderBy, excludeTitleFilters));
    } else {
      dispatch(patientsMiddleware.getPatientAppointments(currentPage, order, orderBy));
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
              (appointmentFilter): appointmentFilter is { type: string; id: string; title: string } =>
                typeof appointmentFilter === 'object'
            )
          )
        }
        getOptionDisabled={(option) => {
          if (option && selectedFilters.length > 0) {
            return !!selectedFilters?.find((item: { type: string }) => item.type === option.type);
          }

          return false;
        }}
        options={filters.length ? adaptedGroupedOptions() : []}
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
