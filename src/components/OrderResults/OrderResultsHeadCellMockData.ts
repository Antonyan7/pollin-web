import { OrderResultsSortFields } from '@axios/results/resultsManagerTypes';
import { Translation } from 'constants/translations';
import { TFunction } from 'i18next';
import { paddings } from 'themes/themeConstants';

export const headCellsData = (t: TFunction) => [
  {
    id: OrderResultsSortFields.DATE,
    label: t(Translation.PAGE_PATIENT_ORDER_RESULTS_CELLS_DATE),
    align: 'left',
    paddingLeft: paddings.left0,
    isSortable: true
  },
  {
    id: OrderResultsSortFields.NAME,
    label: t(Translation.PAGE_PATIENT_ORDER_RESULTS_CELLS_PANELNAME),
    align: 'left',
    paddingLeft: paddings.left0,
    isSortable: true
  },
  {
    id: OrderResultsSortFields.UNIT,
    label: t(Translation.PAGE_PATIENT_ORDER_RESULTS_CELLS_UNIT),
    align: 'left',
    paddingLeft: paddings.left0,
    isSortable: true
  },
  {
    id: OrderResultsSortFields.RESULT,
    label: t(Translation.PAGE_PATIENT_ORDER_RESULTS_CELLS_RESULT),
    align: 'left',
    paddingLeft: paddings.left0,
    isSortable: true
  },
  {
    id: OrderResultsSortFields.STATUS,
    label: t(Translation.PAGE_PATIENT_ORDER_RESULTS_CELLS_STATUS),
    align: 'left',
    paddingLeft: paddings.left0,
    isSortable: true
  },
  {
    id: OrderResultsSortFields.FINAL_RESULT_TYPE,
    label: t(Translation.PAGE_PATIENT_ORDER_RESULTS_CELLS_FINALRESULTTYPE),
    align: 'left',
    paddingLeft: paddings.left0,
    isSortable: true
  }
];
