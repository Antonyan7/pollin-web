import { TestResultsListSortFields } from '@axios/results/resultsManagerTypes';
import { TFunction } from 'i18next';
import { paddings } from 'themes/themeConstants';
import { TestResultsFilters } from 'types/results';

import { Translation } from '../../constants/translations';

export const headCellsData = (t: TFunction) => [
  {
    id: TestResultsFilters.TestPanel,
    label: t(Translation.PAGE_RESULTS_CELLS_TEST_PANEL),
    align: 'left',
    paddingLeft: paddings.left0,
    isSortable: false
  },
  {
    id: TestResultsListSortFields.PATIENT_NAME,
    label: t(Translation.PAGE_RESULTS_CELLS_PATIENT_NAME),
    align: 'left',
    paddingLeft: paddings.left0,
    isSortable: true
  },
  {
    id: TestResultsListSortFields.LAB,
    label: t(Translation.PAGE_RESULTS_CELLS_LAB),
    align: 'left',
    paddingLeft: paddings.left0,
    isSortable: false
  },
  {
    id: TestResultsListSortFields.STATUS,
    label: t(Translation.PAGE_RESULTS_CELLS_STATUS),
    align: 'left',
    paddingLeft: paddings.left0,
    isSortable: false
  },
  {
    id: TestResultsListSortFields.COLLECTION_AGE,
    label: t(Translation.PAGE_RESULTS_CELLS_AGE),
    align: 'center',
    paddingLeft: paddings.left20,
    isSortable: true
  }
];
