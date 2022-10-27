import { TFunction } from 'i18next';
import { paddings } from 'themes/themeConstants';

import { Translation } from '../../constants/translations';

export const headCellsData = (t: TFunction) => [
  {
    id: 'Test/Panel',
    label: t(Translation.PAGE_RESULTS_CELLS_TEST_PANEL),
    align: 'left',
    paddingLeft: paddings.left0,
    isSortable: false
  },
  {
    id: 'Patient Info',
    label: t(Translation.PAGE_RESULTS_CELLS_PATIENT_INFO),
    align: 'left',
    paddingLeft: paddings.left0,
    isSortable: true
  },
  {
    id: 'Lab',
    label: t(Translation.PAGE_RESULTS_CELLS_LAB),
    align: 'left',
    paddingLeft: paddings.left0,
    isSortable: true
  },
  {
    id: 'Status',
    label: t(Translation.PAGE_RESULTS_CELLS_STATUS),
    align: 'left',
    paddingLeft: paddings.left0,
    isSortable: false
  },
  {
    id: 'Collection Age',
    label: t(Translation.PAGE_RESULTS_CELLS_AGE),
    align: 'center',
    paddingLeft: paddings.left20,
    isSortable: true
  }
];
