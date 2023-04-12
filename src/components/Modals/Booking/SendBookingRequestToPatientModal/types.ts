export interface SendBookingRequestToPatientModalProps {
  isPatientProfile: boolean;
  patientId: string;
}

export interface ISendBookingRequestFormValues {
  serviceTypeId: string;
  patientId: string;
}

export interface IConfirmBookingRequestToPatientModalProps extends ISendBookingRequestFormValues {}

export interface ISendBookingRequestToPatientRequest extends ISendBookingRequestFormValues {}
