import { DropdownOptionType } from '@axios/patientEmr/managerPatientEmrTypes';

import { IMedicalBackgroundItem } from '../../types';

export interface DropdownProps extends Partial<IMedicalBackgroundItem> {
  dropdownType: DropdownOptionType;
  multiple?: boolean;
}
