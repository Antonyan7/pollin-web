import { createSlice } from '@reduxjs/toolkit';

import { AppointmentsProps } from '../../types/reduxTypes/appointments';

const initialState: AppointmentsProps = {
  patientData: [],
  appointmentTypeData: [],
  appointments: [],
  appointmentDetails: null,
  error: []
};

export const appointments = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    getPatientNames(state, action) {
      state.patientData = action.payload;
    },
    getAppointmentTypes(state, action) {
      state.appointmentTypeData = action.payload;
    },
    createAppointment(state, action) {
      state.appointments = [...state.appointments, action.payload];
    },
    hasError(state, action) {
      state.error = [...state.error, action.payload];
    },
    fetchAppointmentDetails(state, action) {
      state.appointmentDetails = action.payload;
    },
    updateAppointment(state, action) {
      state.appointmentDetails = action.payload;
    }
  }
});

export default appointments.reducer;
