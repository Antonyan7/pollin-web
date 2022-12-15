import { ICreateEncounterAddendumRequest, ICreateEncounterNoteRequest } from '@axios/patientEmr/managerPatientEmrTypes';
import { IEncountersFormDefaultProps } from 'types/patient';

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
