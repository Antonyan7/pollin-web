import { ISpecimenForAppointment } from '@axios/results/resultsManagerTypes';

const extractDefaultFormFieldsFromSpecimens = (specimens: ISpecimenForAppointment[]) => {
  if (!specimens) {
    return {};
  }

  return {
    locations: specimens.map((specimen) => ({
      identifier: specimen.identifier,
      specimenId: specimen.id,
      storageLocationId: '',
      id: specimen.identifier
    }))
  };
};

export default extractDefaultFormFieldsFromSpecimens;
