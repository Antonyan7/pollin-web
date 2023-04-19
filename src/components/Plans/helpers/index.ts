import { IPatientPlansStatus } from '@axios/patientEmr/managerPatientEmrTypes';
import { InitialConsultationFormFields } from '@components/Plans/types';
import { Translation } from 'constants/translations';
import { t } from 'i18next';
import { v4 } from 'uuid';

export const maximumAmoutOfPartners = 4;

export const getPatientDetailsValues = () => ({
  id: v4()
});

export const genitourinaryHistoryValues = [
  {
    id: v4(),
    fieldName: InitialConsultationFormFields.PreviousConception,
    description: t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_PREVIOUS_CONCEPTION)
  },
  {
    id: v4(),
    fieldName: InitialConsultationFormFields.BiologicalChildren,
    description: t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_BIOLOGICAL_CHILDREN)
  },
  {
    id: v4(),
    fieldName: InitialConsultationFormFields.BiologicalChildrenPartner,
    description: t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_BIOLOGICAL_CHILDREN_WITH_PARTNER)
  },
  {
    id: v4(),
    fieldName: InitialConsultationFormFields.PastSemenAnalysis,
    description: t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_PAST_SEMEN_ANALYSIS)
  },
  {
    id: v4(),
    fieldName: InitialConsultationFormFields.DisgnosedConditions,
    description: t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_DISGNOSED_CONDITIONS)
  },
  {
    id: v4(),
    fieldName: InitialConsultationFormFields.AbnormalResults,
    description: t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_ABNORMAL_RESULTS)
  },
  {
    id: v4(),
    fieldName: InitialConsultationFormFields.Vasectomy,
    description: t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_VASECTOMY)
  },
  {
    id: v4(),
    fieldName: InitialConsultationFormFields.VasectomyReversal,
    description: t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_VASECTOMY_REVERSAL)
  },
  {
    id: v4(),
    fieldName: InitialConsultationFormFields.DifficultyErectionsEjaculations,
    description: t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_DIFFICULTY_ERECTIONS)
  }
];

export const findStatus = (statuses: IPatientPlansStatus[], currentStatusId: string) =>
  statuses.find((status) => status.status === currentStatusId);
