import { array, boolean, object, string } from 'yup';

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
          type: string().required(),
          cycles: string().required()
        })
      )
      .when('exists', {
        is: true,
        then: array()
          .of(
            object().shape({
              type: string().required(),
              cycles: string().required()
            })
          )
          .required(),
        otherwise: array().notRequired().nullable()
      })
  })
});

export const menstrualCycleHistoryValidationSchema = object({
  hasPeriod: object({
    value: boolean().required()
  }),
  cycleLength: object({
    value: string().required()
  }),
  firstDayOfLastPeriod: object({
    value: string().required()
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
    value: string().required()
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
    items: array().of(
      object().shape({
        id: string().required()
      })
    )
  }),
  hyperprolactinemia: object({
    items: array().of(
      object().shape({
        id: string().required()
      })
    )
  }),
  signsOfPOI: object({
    items: array().of(
      object().shape({
        id: string().required()
      })
    )
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
