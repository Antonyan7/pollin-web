import { Dispatch, SetStateAction } from 'react';
import { ISpecimenForAppointment } from '@axios/results/resultsManagerTypes';

export interface SpecimenCollectionModalProps {
  appointmentId: string;
}

export interface SpecimenCollectionModalSteps {
  collectionModalCurrentStep: number;
  setCollectionModalCurrentStep?: Dispatch<SetStateAction<number>>;
}

export interface SpecimenCollectionModalActionsProps extends SpecimenCollectionModalSteps {
  appointmentId: string;
  onClose: () => void;
}

export interface SpecimenDataCollectionProgressBarProps extends SpecimenCollectionModalSteps {
  isProgressFreezed: boolean;
}

export interface SpecimenTestDataProps {
  specimenTestData: ISpecimenForAppointment;
  isLastTestData: boolean;
}

export interface SelectSpecimenLocationProps {
  specimenId: string;
}

export interface ISpecimenCollectionFormLocationData {
  identifier: string;
  specimenId: string;
  storageLocationId: string;
}

export interface ISpecimenCollectionLocationsField {
  locations: ISpecimenCollectionFormLocationData[];
}
