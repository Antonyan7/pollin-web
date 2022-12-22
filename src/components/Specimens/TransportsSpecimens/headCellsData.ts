import { TransportsSortFields } from '@axios/results/resultsManagerTypes';
import { Translation } from 'constants/translations';
import { TFunction } from 'i18next';
import { paddings } from 'themes/themeConstants';

export const headCellsData = (t: TFunction) => [
  {
    id: 'transportFolder',
    label: t(Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_CELLS_FOLDER),
    align: 'left',
    paddingLeft: paddings.left0,
    isSortable: false
  },
  {
    id: TransportsSortFields.DATE,
    label: t(Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_CELLS_DATE_TIME_CREATED),
    align: 'left',
    paddingLeft: paddings.left0,
    isSortable: true
  },
  {
    id: TransportsSortFields.LAB_DESTINATION,
    label: t(Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_CELLS_LAB_DESTINATION),
    align: 'left',
    paddingLeft: paddings.left0,
    isSortable: true
  },
  {
    id: 'driverName',
    label: t(Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_CELLS_DRIVER_NAME),
    align: 'left',
    paddingLeft: paddings.left20,
    isSortable: false
  },
  {
    id: TransportsSortFields.STATUS,
    label: t(Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_CELLS_STATUS),
    align: 'left',
    paddingLeft: paddings.left0,
    isSortable: true
  }
];
