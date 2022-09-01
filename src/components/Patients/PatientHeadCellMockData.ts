import { IHeadCell } from '../../types/patient';

export const headCellsListMockData: IHeadCell[] = [
  {
    id: 'empty',
    label: '',
    align: 'left',
    paddingLeft: 0
  },
  {
    id: 'name',
    label: 'Name',
    align: 'left',
    paddingLeft: 0
  },
  {
    id: 'doctor',
    label: 'Doctor',
    align: 'left',
    paddingLeft: 0
  },
  {
    id: 'alerts',
    label: 'Alerts',
    align: 'center',
    paddingLeft: '25px'
  },
  {
    id: 'date',
    label: 'Date of Birth',
    align: 'center',
    paddingLeft: '20px'
  },
  {
    id: 'status',
    label: 'Cycle Status',
    align: 'center',
    paddingLeft: '20px'
  }
];
