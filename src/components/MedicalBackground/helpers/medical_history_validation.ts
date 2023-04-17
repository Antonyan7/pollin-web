import { TypeOfPregnancy } from '@axios/patientEmr/managerPatientEmrTypes';
import { array, boolean, mixed, object, string } from 'yup';

export const fertilityHistoryValidationSchema = object({
  isTryingForPregnancy: object({
    value: boolean().required()
  }),
  monthsConceiving: object({
    value: string().required()
  }),
  ovulationTracking: object({
    value: boolean().required()
  }),
  ovulationIntercourse: object({
    value: boolean().required()
  }),
  usingLubricants: object({
    value: boolean().required()
  }),
  seenFertilitySpecialist: object({
    value: boolean().required()
  }),
  previousTreatment: object({
    exists: boolean(),
    treatments: array()
      .of(
        object().shape({
          type: string(),
          cycles: string()
        })
      )
      .when('exist', {
        is: true,
        then: array()
          .of(
            object().shape({
              type: string().required(),
              cycles: string().required()
            })
          )
          .required(),
        otherwise: array().transform(() => [])
      })
  })
});

export const femalePregnancyInformationValidationSchema = object({
  previousPregnancies: object({
    value: boolean(),
    pregnancies: mixed().when('value', {
      is: true,
      then: array().of(
        object().shape({
          id: string().nullable(),
          type: string().required(),
          details: array().when('type', (type) => {
            switch (type) {
              case TypeOfPregnancy.FullTerm:
                return object().shape({
                  year: string().required(),
                  type: string().required(),
                  monthsToConceive: string().required(),
                  birthOutcome: string().required()
                });
              case TypeOfPregnancy.Preterm:
                return object().shape({
                  year: string().required(),
                  type: string().required(),
                  monthsToConceive: string().required(),
                  birthOutcome: string().required()
                });
              case TypeOfPregnancy.EctopicTubal:
                return object().shape({
                  year: string().required(),
                  type: string().required(),
                  location: string().required(),
                  monthsToConceive: string().required()
                });
              case TypeOfPregnancy.Miscarriage:
                return object().shape({
                  year: string().required(),
                  type: string().required(),
                  monthsToConceive: string().required()
                });
              case TypeOfPregnancy.ElectiveTermination:
                return object().shape({
                  year: string().required()
                });

              default:
                return object().notRequired();
            }
          })
        })
      ),
      otherwise: array().transform(() => [])
    })
  })
});

export const menstrualCycleHistoryValidationSchema = object({
  hasPeriod: object({
    value: boolean().required()
  }),
  cycleLength: object().when('hasPeriod.value', {
    is: true,
    then: object({
      value: string().required()
    })
  }),
  firstDayOfLastPeriod: object().when('hasPeriod.value', {
    is: true,
    then: object({
      value: string().required()
    })
  }),
  flow: object({
    value: string().required()
  }),
  daysOfBleeding: object({
    value: string().required()
  }),
  pain: object({
    value: string().required()
  }),
  clots: object({
    value: boolean().required()
  }),
  symptoms: object({
    value: boolean().required()
  })
});

export const gynaecologicalHistoryValidationSchema = object({
  takingBirthControl: object({
    value: boolean().required()
  }),
  isOvulating: object({
    value: boolean().required()
  }),
  previousPapTest: object({
    value: boolean().required()
  }),
  papTestLastDate: object({
    value: string().required().nullable()
  }),
  abnormalPapProcedures: object({
    items: array().of(
      object().shape({
        id: string().required()
      })
    )
  }),
  gynaecologicalConditions: object({
    items: array().of(
      object().shape({
        id: string().required()
      })
    )
  }),
  signsOfPCOS: object({
    items: array().min(1, 'isRequired').required()
  }),
  hyperprolactinemia: object({
    items: array().min(1, 'isRequired').required()
  }),
  signsOfPOI: object({
    items: array().min(1, 'isRequired').required()
  }),
  abnormalPap: object({
    value: boolean().required()
  }),
  breastfeeding: object({
    value: boolean().required()
  }),
  cervixTreatment: object({
    value: boolean().required()
  }),
  intercoursePain: object({
    value: boolean().required()
  })
});
