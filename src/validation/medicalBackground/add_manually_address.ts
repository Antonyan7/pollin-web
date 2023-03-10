import { Translation } from 'constants/translations';
import { generateErrorMessage } from 'helpers/generateErrorMessage';
import { t } from 'i18next';
import { object, string } from 'yup';

export const addManuallyAddressModalValidationSchema = object({
  streetAddress: string().required(
    generateErrorMessage(t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MANUALLY_MODAL_STREET_ADDRESS))
  ),
  unitNumber: string().notRequired(),
  province: string().required(
    generateErrorMessage(t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MANUALLY_MODAL_PROVINCE))
  ),
  postalCode: string().required(
    generateErrorMessage(t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MANUALLY_POSTAL_CODE))
  ),
  city: string().required(generateErrorMessage(t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MANUALLY_CITY))),
  country: string().default('Canada')
});
