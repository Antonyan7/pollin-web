import { Translation } from 'constants/translations';
import { TFunction } from 'i18next';
import { paddings } from 'themes/themeConstants';

export const headCellsData = (t: TFunction) => [
  {
    id: 'specimenId',
    label: t(Translation.PAGE_IN_HOUSE_SPECIMENS_CELLS_ID),
    align: 'left',
    paddingLeft: paddings.left0,
    isSortable: false
  },
  {
    id: 'patientName',
    label: t(Translation.PAGE_RESULTS_CELLS_PATIENT_NAME),
    align: 'left',
    paddingLeft: paddings.left0,
    isSortable: false
  },
  {
    id: 'age',
    label: t(Translation.PAGE_RESULTS_CELLS_AGE),
    align: 'left',
    paddingLeft: paddings.left0,
    isSortable: false
  },
  {
    id: 'status',
    label: t(Translation.PAGE_RESULTS_CELLS_STATUS),
    align: 'left',
    paddingLeft: paddings.left20,
    isSortable: false
  }
];
