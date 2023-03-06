import { array, number, object, string } from 'yup';

import { GeneralHealthFormFields } from '../Contact/PatientGeneralHealth/edit/types';

export const patientGeneralHealthValidationSchema = object({
  [GeneralHealthFormFields.Height]: object({
    feet: number()
      .transform((value) => (Number.isNaN(value) ? undefined : value))
      .required(),
    inches: number()
      .transform((value) => (Number.isNaN(value) ? undefined : value))
      .required()
  }),
  [GeneralHealthFormFields.Weigth]: object({
    value: number()
      .transform((value) => (Number.isNaN(value) ? undefined : value))
      .required()
  }),
  [GeneralHealthFormFields.MedicalProblems]: object({
    items: array().of(
      object().shape({
        id: string().required()
      })
    )
  }),
  [GeneralHealthFormFields.PastSurgeries]: object({
    items: array().of(
      object().shape({
        typeOfSurgery: string().required(),
        dateOfSurgery: string().required()
      })
    )
  }),
  [GeneralHealthFormFields.VitaminSupplements]: object({
    items: array().of(
      object().shape({
        title: string().required(),
        dosage: string().required()
      })
    )
  }),
  [GeneralHealthFormFields.DrugAllergies]: object({
    items: array().of(
      object().shape({
        title: string().required()
      })
    )
  }),
  [GeneralHealthFormFields.FoodAllergies]: object({
    items: array().of(
      object().shape({
        title: string().required()
      })
    )
  }),
  [GeneralHealthFormFields.CurrentStressLevel]: object({
    value: string().required()
  }),
  [GeneralHealthFormFields.FamilyHistory]: object({
    items: array().of(
      object().shape({
        title: string().required(),
        familyMemberName: string().required()
      })
    )
  }),
  [GeneralHealthFormFields.Diet]: object({
    value: string().required()
  }),
  [GeneralHealthFormFields.AdditionalInformation]: object({
    value: string().notRequired()
  })
});
