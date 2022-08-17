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
  { patientId: 'The Shawshank Redemption' },
  { patientId: 'The Godfather' },
  { patientId: 'The Godfather: Part II' },
  { patientId: 'ABCD' },
  { patientId: 'BACD' },
  { patientId: 'CABD' },
  { patientId: 'DABC' },
  { patientId: 'The Dark Knight' }
];
const mockAppointmentTypes = [
  { appointmentTypeId: 'The Shawshank Redemption' },
  { appointmentTypeId: 'The Godfather' },
  { appointmentTypeId: 'The Godfather: Part II' },
  { appointmentTypeId: 'ABCD' },
  { appointmentTypeId: 'BACD' },
  { appointmentTypeId: 'CABD' },
  { appointmentTypeId: 'DABC' },
  { appointmentTypeId: 'The Dark Knight' }
];
const mockAppointmentDetails: AppointmentDetailsProps[] = [
  {
    appointmentType: { id: 'slot1', title: 'IC - Initial Consultation (Virtual) [Duration: 30 minutes]' },
    date: new Date(),
    status: ['Cancelled'],
    description: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit'],
    cancellationReason: 'Reason',
    isVirtual: true,
    patient: { id: '12345', name: 'Jane Doe' }
  }
];

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
        appointmentTypeResponse = (await axios.get('/appointment-type')).data;
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

export const getAppointmentDetails = (appointmentId: string = '') => {
  let detailsResponse: AppointmentDetailsProps[] = [];

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
