import { array, boolean, number, object, string } from 'yup';

import { ContactInformationFormFields } from '../Contact/PatientContactInformation/edit/types/index';
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

export const patientContactInformationValidationSchema = object({
  [ContactInformationFormFields.PatientName]: object({
    firstName: string().required(),
    lastName: string().required(),
    middleName: string().notRequired()
  }),
  [ContactInformationFormFields.PreferredName]: object({
    value: string().required()
  }),
  [ContactInformationFormFields.Contribution]: object({
    value: string().required()
  }),
  [ContactInformationFormFields.PrimaryAddress]: object({
    streetAddress: string().required(),
    unitNumber: string().notRequired()
  }),
  [ContactInformationFormFields.MailingAddress]: object({
    streetAddress: string().required(),
    unitNumber: string().notRequired()
  }),
  [ContactInformationFormFields.OHIP]: object({
    exists: boolean(),
    number: string().when('exists', {
      is: true,
      then: string().required(),
      otherwise: string().notRequired()
    }),
    versionCode: string().when('exists', {
      is: true,
      then: string().required(),
      otherwise: string().notRequired()
    })
  })
});
