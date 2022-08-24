export interface CreateAppointmentProps {
  appointmentTypeId: string;
  patientId: string;
  description?: string;
  date: Date | string;
}
export interface AppointmentDetailsProps {
  appointmentType: { id: string; title: string };
  date: Date;
  status: string;
  description: string;
  cancellationReason: string;
  isVirtual?: boolean;
  patient: { id: string; name: string };
}

export interface PatientNamesProps {
  id: string;
  title: string;
}

export interface AppointmentTypesProps {
  id: string;
  title: string;
  isVirtual?: boolean;
}

export interface AppointmentsProps {
  patientData: { id: string; title: string }[];
  appointmentTypeData: { id: string; title: string; isVirtual?: boolean }[];
  appointments: CreateAppointmentProps[];
  appointmentDetails: AppointmentDetailsProps | null;
  error: Error[];
}
