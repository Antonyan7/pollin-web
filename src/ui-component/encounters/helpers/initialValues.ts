import { ICreateEncounterAddendumRequest, ICreateEncounterNoteRequest } from '@axios/patientEmr/managerPatientEmrTypes';
import { IEncountersFormDefaultProps } from 'types/patient';
import { object, string } from 'yup';

export const maxEncountersSearchLength = 100;

export const getEditEncounterInitialValues = (
  initialValues?: IEncountersFormDefaultProps
): IEncountersFormDefaultProps => ({
  id: initialValues?.id ?? '',
  content: initialValues?.content ?? ''
});

export const getAddAddendumInitialValues = (): ICreateEncounterAddendumRequest => ({
  encounterId: '',
  content: ''
});

export const getAddEncounterInitialValues = (): Omit<ICreateEncounterNoteRequest, 'patientId'> => ({
  encountersTypeId: '',
  content: ''
});

export const addAddendumValidationSchema = object({
  content: string().required()
});

export const addEncounterValidationSchema = object({
  encountersTypeId: string().required(),
  content: string().required()
});

export const editEncounterValidationSchema = object({
  content: string().required()
});

export const removeHtmlTags = /<(.|\n)*?>/g;
