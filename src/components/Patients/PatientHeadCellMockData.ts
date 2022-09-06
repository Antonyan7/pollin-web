import { IHeadCell } from '../../types/patient';

export const headCellsListMockData: IHeadCell[] = [
  {
    id: 'empty',
    label: '',
    align: 'left',
    paddingLeft: 0,
    isSortable: false
  },
  {
    id: 'name',
    label: 'Name',
    align: 'left',
    paddingLeft: 0,
    isSortable: false
  },
  {
    id: 'doctor',
    label: 'Doctor',
    align: 'left',
    paddingLeft: 0,
    isSortable: true
  },
  {
    id: 'alerts',
    label: 'Alerts',
    align: 'center',
    paddingLeft: '25px',
    isSortable: true
  },
  {
    id: 'date',
    label: 'Date of Birth',
    align: 'center',
    paddingLeft: 0,
    isSortable: false
  },
  {
    id: 'cycleStatus',
    label: 'Cycle Status',
    align: 'center',
    paddingLeft: '20px',
    isSortable: true
  }
];
