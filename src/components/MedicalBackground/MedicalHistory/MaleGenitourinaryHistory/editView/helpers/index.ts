import { IGenitourinaryHistory } from '@axios/patientEmr/managerPatientEmrTypes';

import { GenitourinaryFields } from '../types';

export const MaleGenitourinaryHistoryEditEmptyState = (genitourinaryHistoryInformation: IGenitourinaryHistory) => ({
  [GenitourinaryFields.PreviousConception]: {
    ...genitourinaryHistoryInformation?.previousConception,
    value: genitourinaryHistoryInformation?.previousConception?.value ?? false
  },
  [GenitourinaryFields.BiologicalChildren]: {
    ...genitourinaryHistoryInformation?.haveBiologicalChildren,
    value: genitourinaryHistoryInformation?.haveBiologicalChildren.value ?? false
  },
  [GenitourinaryFields.BiologicalChildrenWithCurrentPartner]: {
    ...genitourinaryHistoryInformation?.biologicalChildrenWithPartner,
    value: genitourinaryHistoryInformation?.biologicalChildrenWithPartner.value ?? false
  },
  [GenitourinaryFields.PastSemenAnalysis]: {
    ...genitourinaryHistoryInformation?.hadSemenAnalysis,
    value: genitourinaryHistoryInformation?.hadSemenAnalysis.value ?? false
  },
  [GenitourinaryFields.AbnormalResults]: {
    ...genitourinaryHistoryInformation?.semenAnalysisIsNormal,
    value: genitourinaryHistoryInformation?.semenAnalysisIsNormal.value ?? false
  },
  [GenitourinaryFields.DiagnosedConditions]: genitourinaryHistoryInformation?.diagnosedConditions,
  [GenitourinaryFields.Vasectomy]: {
    ...genitourinaryHistoryInformation?.vasectomy,
    value: genitourinaryHistoryInformation?.vasectomy.value ?? false
  },
  [GenitourinaryFields.VasectomyReversal]: {
    ...genitourinaryHistoryInformation?.vasectomyReversal,
    value: genitourinaryHistoryInformation?.vasectomyReversal.value ?? false
  },
  [GenitourinaryFields.DifficultyWithErectionsEjaculations]: {
    ...genitourinaryHistoryInformation?.erectionDifficulties,
    value: genitourinaryHistoryInformation?.erectionDifficulties.value ?? false
  },
  [GenitourinaryFields.UndescendedTesticals]: {
    ...genitourinaryHistoryInformation?.undescendedTesticles,
    value: genitourinaryHistoryInformation?.undescendedTesticles?.value
  },
  [GenitourinaryFields.TesticularIssues]: {
    ...genitourinaryHistoryInformation?.testicularIssues,
    value: genitourinaryHistoryInformation?.testicularIssues?.value
  },
  [GenitourinaryFields.Toxins]: {
    ...genitourinaryHistoryInformation?.toxins,
    value: genitourinaryHistoryInformation?.toxins?.value
  },
  [GenitourinaryFields.Infections]: {
    ...genitourinaryHistoryInformation?.infections,
    value: genitourinaryHistoryInformation?.infections?.value
  },
  [GenitourinaryFields.GenitalSurgery]: {
    ...genitourinaryHistoryInformation?.genitalSurgery,
    value: genitourinaryHistoryInformation?.genitalSurgery?.value
  }
});
