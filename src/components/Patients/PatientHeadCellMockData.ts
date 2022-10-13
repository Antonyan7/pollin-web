import { paddings } from 'themes/themeConstants';
import { IHeadCell } from 'types/patient';

export const headCellsListMockData: IHeadCell[] = [
  {
    id: 'empty',
    label: '',
    align: 'left',
    paddingLeft: paddings.left0,
    isSortable: false
  },
  {
    id: 'name',
    label: 'Name',
    align: 'left',
    paddingLeft: paddings.left0,
    isSortable: false
  },
  {
    id: 'Doctor',
    label: 'Doctor',
    align: 'left',
    paddingLeft: paddings.left0,
    isSortable: true
  },
  {
    id: 'Alert',
    label: 'Alerts',
    align: 'center',
    paddingLeft: paddings.left24,
    isSortable: true
  },
  {
    id: 'date',
    label: 'Date of Birth',
    align: 'center',
    paddingLeft: paddings.left0,
    isSortable: false
  },
  {
    id: 'CycleStatus',
    label: 'Cycle Status',
    align: 'center',
    paddingLeft: paddings.left20,
    isSortable: true
  }
];
