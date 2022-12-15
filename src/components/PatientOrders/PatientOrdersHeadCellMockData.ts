import { Translation } from 'constants/translations';
import { TFunction } from 'i18next';
import { paddings } from 'themes/themeConstants';

export const headCellsData = (t: TFunction) => [
  {
    id: 'date',
    label: t(Translation.PAGE_PATIENT_PROFILE_CELLS_DATE_TITLE),
    align: 'left',
    paddingLeft: paddings.left0,
    isSortable: true
  },
  {
    id: 'orderName',
    label: t(Translation.PAGE_PATIENT_PROFILE_CELLS_ORDER_NAME_TITLE),
    align: 'left',
    paddingLeft: paddings.left0,
    isSortable: false
  },
  {
    id: 'orderType',
    label: t(Translation.PAGE_PATIENT_PROFILE_CELLS_ORDER_NAME_TITLE),
    align: 'left',
    paddingLeft: paddings.left0,
    isSortable: false
  },
  {
    id: 'status',
    label: t(Translation.PAGE_PATIENT_PROFILE_CELLS_STATUS_TITLE),
    align: 'left',
    paddingLeft: paddings.left0,
    isSortable: true
  }
];
