import { TFunction } from 'i18next';
import { paddings } from 'themes/themeConstants';
import { TasksManagement } from 'types/tasks';

import { Translation } from '../../constants/translations';

export const headCellsData = (t: TFunction) => [
  {
    id: TasksManagement.TaskName,
    label: t(Translation.PAGE_PATIENT_CHECK_IN_TABLE_HEADER_NAME),
    align: 'left',
    paddingLeft: paddings.left0
  },
  {
    id: TasksManagement.PatientName,
    label: t(Translation.PAGE_PATIENT_CHECK_IN_TABLE_HEADER_APPOINTMENT_TIME),
    align: 'left',
    paddingLeft: paddings.left0
  },
  {
    id: TasksManagement.Due,
    label: t(Translation.PAGE_PATIENT_CHECK_IN_TABLE_HEADER_STATUS),
    align: 'center',
    paddingLeft: paddings.left0
  }
];
