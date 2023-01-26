import React from 'react';
import { useTranslation } from 'react-i18next';
import { PatientAppointmentsFilterOption } from '@axios/booking/managerBookingTypes';
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
  const currentPatientId = useAppSelector(patientsSelector.currentPatientId);
  const isAppointmentFiltersLoading = useAppSelector(patientsSelector.isPatientAppointmentFiltersLoading);
  const { list, orderBy, order, filters, selectedFilters } = useAppSelector(patientsSelector.patientAppointments);
  const { currentPage } = list;
  const currentPatientAppointmentFilterField = useAppSelector(patientsSelector.currentPatientAppointmentFilterField);

  const adaptedGroupedOptions = () =>
    filters && filters.length > 0
      ? filters?.flatMap((item) => item?.options.map((option) => ({ ...option, type: item.type })))
      : [];

  const onAppointmentRecencyChange = async (appointmentFilters: PatientAppointmentsFilterOption[]) => {
    dispatch(
      patientsMiddleware.getPatientAppointments(currentPatientId, currentPage, order, orderBy, appointmentFilters)
    );
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
