import { PreviousTreatmentFieldProps } from '@axios/patientEmr/managerPatientEmrTypes';

import { createObjectWithTitle, getLabelByBoolean } from '../helpers/mapper';

const mappingPattern = {
  isTryingForPregnancy: createObjectWithTitle('Trying for Pregnancy'),
  ovulationTracking: createObjectWithTitle('Ovulation Tracking'),
  monthsConceiving: createObjectWithTitle('Months Conceiving'),
  ovulationIntercourse: createObjectWithTitle('Ovulation Kit Timed Intercourse'),
  usingLubricants: createObjectWithTitle('Lubricants'),
  seenFertilitySpecialist: createObjectWithTitle('Previous Fertility Specialist'),
  previousTreatment: {
    ...createObjectWithTitle('Previous Fertility Treatment'),
    customAccessor: (item: PreviousTreatmentFieldProps) => {
      const values = item.treatments.map((treatment) => `${treatment.type}; ${treatment.cycles}`);
      const finalValues = [getLabelByBoolean(item.exists), ...values];

      return finalValues;
    }
  }
};

export default mappingPattern;
