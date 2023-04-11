export interface SendBookingRequestToPatientModalProps {
  patientId: string;
}

export interface ISendBookingRequestFormValues {
  serviceTypeId: string;
  patientId: string;
}

export interface ISendBookingRequestToPatientRequest extends ISendBookingRequestFormValues {}
