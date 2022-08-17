export interface CreateAppointmentProps {
  appointmentTypeId: string;
  patientId: string;
  description?: string;
  date: Date | string;
}

export interface AppointmentsProps {
  patientData: { patientId: string }[];
  appointmentTypeData: { appointmentTypeId: string }[];
  appointments: CreateAppointmentProps[];
  appointmentDetails: AppointmentDetailsProps[];
  error: Error[];
}

export interface AppointmentDetailsProps {
  appointmentType: { id: string; title: string };
  date: Date;
  status: string[];
  description: string[];
  cancellationReason: string;
  isVirtual: boolean;
  patient: { id: string; name: string };
}
