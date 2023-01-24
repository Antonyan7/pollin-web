import { RadioGroupProps } from '@mui/material';

export enum InitialConsultationFormRadioValues {
  Yes = 'Yes',
  No = 'No'
}

export interface PartnerFormHeaderProps {
  title: string;
}

export interface ConsultationTitleWithIconProps {
  description: string;
}

export interface ConsultationFormRadioProps {
  value?: RadioGroupProps['value'];
  onChange?: RadioGroupProps['onChange'];
  fieldName: string;
}

export interface GenitourinaryHistoryContentProps {
  description: string;
  fieldName: string;
}

export enum InitialConsultationFormFields {
  PrimaryPatientContribution = 'PrimaryPatientContribution',
  JourneyInvolved = 'JourneyInvolved',
  PreviousConception = 'PreviousConception',
  BiologicalChildren = 'BiologicalChildren',
  BiologicalChildrenPartner = 'BiologicalChildrenPartner',
  PastSemenAnalysis = 'PastSemenAnalysis',
  AbnormalResults = 'AbnormalResults',
  DisgnosedConditions = 'DisgnosedConditions',
  Vasectomy = 'Vasectomy',
  VasectomyReversal = 'VasectomyReversal',
  DifficultyErectionsEjaculations = 'DifficultyErectionsEjaculations'
}
