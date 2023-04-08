import { BackgroundInformationFormFields } from '@components/MedicalBackground/Contact/PatientBackgroundInformation/edit/types';
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
    exists: boolean(),
    items: array().when('exists', {
      is: true,
      then: array().of(
        object().shape({
          id: string().required(),
        })
      )
    })
  }),
  [GeneralHealthFormFields.PastSurgeries]: object({
    exists: boolean(),
    items: array().when('exists', {
      is: true,
      then: array().of(
        object().shape({
          typeOfSurgery: string().required(),
          dateOfSurgery: string().required()
        })
      )
    })
  }),
  [GeneralHealthFormFields.VitaminSupplements]: object({
    exists: boolean(),
    items: array().when('exists', {
      is: true,
      then: array().of(
        object().shape({
          title: string().required(),
          dosage: string().required()
        })
      )
    })
  }),
  [GeneralHealthFormFields.DrugAllergies]: object({
    exists: boolean(),
    items: array().when('exists', {
      is: true,
      then: array().of(
        object().shape({
          title: string().required(),
        })
      )
    })
  }),
  [GeneralHealthFormFields.FoodAllergies]: object({
    exists: boolean(),
    items: array().when('exists', {
      is: true,
      then: array().of(
        object().shape({
          title: string().required(),
        })
      )
    })
  }),
  [GeneralHealthFormFields.CurrentStressLevel]: object({
    value: string().required()
  }),
  [GeneralHealthFormFields.FamilyHistory]: object({
    exists: boolean(),
    items: array().when('exists', {
      is: true,
      then: array().of(
        object().shape({
          title: string().required(),
          familyMemberName: string().required(),
        })
      )
    })
  }),
  [GeneralHealthFormFields.Diet]: object({
    value: string().notRequired()
  }),
  [GeneralHealthFormFields.AdditionalInformation]: object({
    value: string().notRequired()
  })
});

export const patientBackgroundInformationValidationSchema = object({
  [BackgroundInformationFormFields.CancerPatient]: object({ value: boolean().required() }),
  [BackgroundInformationFormFields.CurrentOccupation]: object({ value: string().required() })
});

export const patientContactInformationValidationSchema = object({
  [ContactInformationFormFields.PatientName]: object({
    firstName: string().required(),
    lastName: string().required(),
    middleName: string().notRequired().nullable()
  }),
  [ContactInformationFormFields.PreferredName]: object({
    value: string().required()
  }),
  [ContactInformationFormFields.Contribution]: object({
    value: string().required()
  }),
  [ContactInformationFormFields.PrimaryAddress]: object({
    streetAddress: string().required(),
    unitNumber: string().notRequired().nullable()
  }),
  [ContactInformationFormFields.MailingAddress]: object({
    streetAddress: string().required(),
    unitNumber: string().notRequired().nullable()
  }),
  [ContactInformationFormFields.OHIP]: object({
    exists: boolean(),
    number: string().when('exists', {
      is: true,
      then: string().test('len', 'Required', ohipNumber => ohipNumber?.length === 12).required(),
      otherwise: string().notRequired().nullable()
    }),
    versionCode: string().when('exists', {
      is: true,
      then: string().test('len', 'Required', ohipVersionCode => ohipVersionCode?.length === 2).required(),
      otherwise: string().notRequired().nullable()
    })
  })
});
