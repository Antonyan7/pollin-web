import { TFunction } from 'i18next';
import { paddings } from 'themes/themeConstants';
import { TasksManagement } from 'types/tasks';

import { Translation } from '../../constants/translations';

export const headCellsData = (t: TFunction) => [
  {
    id: TasksManagement.Task,
    label: t(Translation.PAGE_TASKS_MANAGER_CELLS_TASK),
    align: 'left',
    paddingLeft: paddings.left0,
    isSortable: false
  },
  {
    id: TasksManagement.Patient,
    label: t(Translation.PAGE_TASKS_MANAGER_CELLS_PATIENT),
    align: 'left',
    paddingLeft: paddings.left0,
    isSortable: false
  },
  {
    id: TasksManagement.Due,
    label: t(Translation.PAGE_TASKS_MANAGER_CELLS_DUE),
    align: 'left',
    paddingLeft: paddings.left0,
    isSortable: true
  },
  {
    id: TasksManagement.Priority,
    label: t(Translation.PAGE_TASKS_MANAGER_CELLS_PRIORITY),
    align: 'left',
    paddingLeft: paddings.left0,
    isSortable: true
  },
  {
    id: TasksManagement.Assignee,
    label: t(Translation.PAGE_TASKS_MANAGER_CELLS_ASSIGNEE),
    align: 'center',
    paddingLeft: paddings.left20,
    isSortable: false
  },
  {
    id: TasksManagement.Status,
    label: t(Translation.PAGE_TASKS_MANAGER_CELLS_STATUS),
    align: 'center',
    paddingLeft: paddings.left20,
    isSortable: true
  }
];
