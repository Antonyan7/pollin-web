import { FieldWithNote, SpermSource, SpermType } from '@axios/patientEmr/managerPatientEmrTypes';
import { RadioGroupProps } from '@mui/material';
import { IPatientPlanMedication } from 'types/reduxTypes/plansTypes';

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

export enum PlanPage {
  Create = 'Create',
  List = 'List'
}

export enum MonitoringLocation {
  MonitoredInClinic = 'Monitored in clinic'
}

export interface IFormMedications {
  patientId: string;
  planTypeId: string;
  monitoring: {
    monitoringLocation: FieldWithNote & { value: string };
    cycleNumber: FieldWithNote & { value: string };
  };
  sperm: {
    source: FieldWithNote & { value: SpermSource | string };
    type: FieldWithNote & { value: SpermType | string };
  };
  medications: {
    categoryId: string;
    isExists: boolean;
    items: IPatientPlanMedication[];
  }[];
}
