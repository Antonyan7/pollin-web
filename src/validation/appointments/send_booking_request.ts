import { object, string } from 'yup';

export const sendBookingRequestValidationSchema = object({
  serviceTypeId: string().required(),
  patientId: string().required()
});
