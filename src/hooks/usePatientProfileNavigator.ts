import { useContext } from 'react';
import { PatientProfileNavigatorContext } from 'context/PatientProfileNavigatorContext';

export const usePatientProfileNavigator = () => useContext(PatientProfileNavigatorContext);
