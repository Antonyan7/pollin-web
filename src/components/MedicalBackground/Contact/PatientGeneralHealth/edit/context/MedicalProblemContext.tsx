import { createContext } from 'react';
import { FieldValues, UseFieldArrayReturn } from 'react-hook-form';
import { MedicalContextState } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/helpers';
import { GeneralHealthFormFields } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';

export const MedicalProblemContext =
  createContext<UseFieldArrayReturn<FieldValues, `${GeneralHealthFormFields.MedicalProblems}.items`, 'id'>>(
    MedicalContextState
  );
