import { Translation } from 'constants/translations';
import { t } from 'i18next';

export const getYesNo = (value?: boolean) =>
  value
    ? t(Translation.MODAL_EXTERNAL_RESULTS_PATIENT_CONTACT_INFORMATION_YES)
    : t(Translation.MODAL_EXTERNAL_RESULTS_PATIENT_CONTACT_INFORMATION_NO);
