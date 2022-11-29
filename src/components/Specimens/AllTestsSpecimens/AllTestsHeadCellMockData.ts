import { SpecimensListSortFields } from '@axios/results/resultsManagerTypes';
import { Translation } from 'constants/translations';
import { TFunction } from 'i18next';
import { paddings } from 'themes/themeConstants';

export const headCellsData = (t: TFunction) => [
  {
    id: 'testName',
    label: t(Translation.PAGE_IN_HOUSE_SPECIMENS_CELLS_TITLE),
    align: 'left',
    paddingLeft: paddings.left0,
    isSortable: false
  },
  {
    id: 'specimenId',
    label: t(Translation.PAGE_IN_HOUSE_SPECIMENS_CELLS_ID),
    align: 'left',
    paddingLeft: paddings.left0,
    isSortable: false
  },
  {
    id: 'labName',
    label: t(Translation.PAGE_SPECIMENS_LAB_NAME),
    align: 'left',
    paddingLeft: paddings.left0,
    isSortable: false
  },
  {
    id: SpecimensListSortFields.COLLECTION_AGE,
    label: t(Translation.PAGE_RESULTS_CELLS_AGE),
    align: 'left',
    paddingLeft: paddings.left20,
    isSortable: true
  },
  {
    id: 'status',
    label: t(Translation.PAGE_RESULTS_CELLS_STATUS),
    align: 'left',
    paddingLeft: paddings.left0,
    isSortable: false
  }
];
