import axios from 'axios';
import { dispatch } from 'redux/hooks';

import {
  AppointmentDetailsProps,
  AppointmentsProps,
  CreateAppointmentProps
} from '../../types/reduxTypes/appointments';
import { appointments } from '../slices/appointments';

// TODO environment should be changed after getting mock server ready.
const environment = 'local';
const mockPatientNames = [
  {
    id: 'exPatientId1',
    title: 'Anry'
  },
  {
    id: 'exPatientId2',
    title: 'Artur'
  },
  {
    id: 'exPatientId3',
    title: 'Abgar'
  }
];
const mockAppointmentTypes = [
  {
    id: 'serviceType1',
    title: 'ServiceType',
    isVirtual: true
  },
  {
    id: 'serviceType2',
    title: 'Block',
    isVirtual: false
  }
];
const mockAppointmentDetails: AppointmentDetailsProps = {
  appointmentType: {
    id: 'serviceType1',
    title: 'ServiceType'
  },
  date: new Date(),
  status: 'Checked In/In Waiting',
  description: 'Clinic Appointment Description',
  cancellationReason: 'Reason Of the cancellation is the timing',
  isVirtual: true,
  patient: {
    id: 'exPatientId1',
    name: 'John'
  }
};

export const getPatientNames = (name: string = '') => {
  let patientResponse: AppointmentsProps['patientData'];

  // TODO till mock server will be ready.
  return async () => {
    try {
      if (environment === 'local') {
        patientResponse = mockPatientNames;
      } else if (environment === 'prd') {
        patientResponse = (
          await axios.get(
            `/${process.env.NEXT_PUBLIC_API_URL_APPOINTMENT}/${process.env.NEXT_PUBLIC_API_VERSION}/patient`,
            { params: { name } }
          )
        ).data;
      }

      dispatch(appointments.actions.getPatientNames(patientResponse));
    } catch (e) {
      dispatch(appointments.actions.hasError(e));
    }
  };
};

export const getAppointmentTypes = () => {
  let appointmentTypeResponse: AppointmentsProps['appointmentTypeData'];

  return async () => {
    try {
      if (environment === 'local') {
        appointmentTypeResponse = mockAppointmentTypes;
      } else if (environment === 'prd') {
        appointmentTypeResponse = (
          await axios.get(
            `/${process.env.NEXT_PUBLIC_API_URL_APPOINTMENT}/${process.env.NEXT_PUBLIC_API_VERSION}/service-type`
          )
        ).data;
      }

      dispatch(appointments.actions.getAppointmentTypes(appointmentTypeResponse));
    } catch (e) {
      dispatch(appointments.actions.hasError(e));
    }
  };
};

export const createNewAppointment = (appointmentDetails: CreateAppointmentProps) => {
  const { appointmentTypeId, patientId, description, date } = appointmentDetails;
  let newAppointmentResponse: CreateAppointmentProps;

  return async () => {
    try {
      if (environment === 'local') {
        newAppointmentResponse = appointmentDetails;
      } else if (environment === 'prd') {
        newAppointmentResponse = (
          await axios.post(
            `/${process.env.NEXT_PUBLIC_API_URL_APPOINTMENT}/${process.env.NEXT_PUBLIC_API_VERSION}/appointment`,
            {
              appointmentTypeId,
              patientId,
              description,
              date
            }
          )
        ).data;
      }

      dispatch(appointments.actions.createAppointment(newAppointmentResponse));
    } catch (e) {
      dispatch(appointments.actions.hasError(e));
    }
  };
};

export const updateAppointmentData = (appointmentDetails: AppointmentDetailsProps) => {
  let editedAppointmentResponse: AppointmentDetailsProps;

  return async () => {
    try {
      if (environment === 'local') {
        editedAppointmentResponse = appointmentDetails;
      } else if (environment === 'prd') {
        editedAppointmentResponse = (
          await axios.put(
            `/${process.env.NEXT_PUBLIC_API_URL_APPOINTMENT}/${process.env.NEXT_PUBLIC_API_VERSION}/appointment`,
            appointmentDetails
          )
        ).data;
      }

      dispatch(appointments.actions.updateAppointment(editedAppointmentResponse));
    } catch (e) {
      dispatch(appointments.actions.hasError(e));
    }
  };
};

export const getAppointmentDetails = (appointmentId: string = '') => {
  let detailsResponse: AppointmentDetailsProps | null = null;

  // TODO till mock server will be ready.
  return async () => {
    try {
      if (environment === 'local' && appointmentId) {
        detailsResponse = mockAppointmentDetails;
      } else if (appointmentId && environment !== 'local') {
        detailsResponse = (
          await axios.get(
            `/${process.env.NEXT_PUBLIC_API_URL_APPOINTMENT}/${process.env.NEXT_PUBLIC_API_VERSION}/appointment`,
            { params: { appointmentId } }
          )
        ).data;
      }

      dispatch(appointments.actions.fetchAppointmentDetails(detailsResponse));
    } catch (e) {
      dispatch(appointments.actions.hasError(e));
    }
  };
};
