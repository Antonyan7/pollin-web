// material-ui
import { styled } from '@mui/material/styles';
import { borderRadius, margins, paddings } from 'themes/themeConstants';

const CalendarWrapper = styled('div')(({ theme }) => ({
  // hide license message
  '& .fc-license-message': {
    display: 'none'
  },
  '& .fc-scrollgrid-sync-inner': {
    backgroundColor: theme.palette.secondary.light
  },

  // basic style
  '& .fc': {
    '--fc-bg-event-opacity': 1,
    '--fc-border-color': theme.palette.divider,
    '--fc-daygrid-event-dot-width': '10px',
    '--fc-today-bg-color': theme.palette.primary.light,
    '--fc-list-event-dot-width': '10px',
    '--fc-event-border-color': theme.palette.primary.dark,
    '--fc-now-indicator-color': theme.palette.error.main,
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily,
    border: '1px solid',
    borderColor: theme.palette.grey[200],
    borderRadius: borderRadius.radius12,
    marginTop: margins.top32,
    padding: paddings.all32
  },

  // slot
  '& .fc .fc-timegrid-slot': {
    height: '40px'
  },

  // time
  '& .fc .fc-timegrid-slot-label': {
    padding: `${paddings.top4} ${paddings.right24} ${paddings.bottom16} ${paddings.left8}`
  },

  // slot lane
  '& .fc .fc-timegrid-slot-lane': {
    backgroundColor: theme.palette.common.white
  },

  // date text
  '& .fc .fc-daygrid-day-top': {
    display: 'grid',
    '& .fc-daygrid-day-number': {
      textAlign: 'center',
      marginTop: margins.top12,
      marginBottom: margins.bottom12
    }
  },

  // weekday
  '& .fc .fc-col-header-cell': {
    backgroundColor: theme.palette.primary.light
  },

  '& .fc .fc-col-header-cell-cushion': {
    color: theme.palette.grey[900],
    padding: paddings.all16
  },

  // events
  '& .fc-direction-ltr .fc-daygrid-event.fc-event-end, .fc-direction-rtl .fc-daygrid-event.fc-event-start': {
    marginLeft: margins.left4,
    marginBottom: margins.bottom8,
    borderRadius: borderRadius.radius8
  },

  '& .fc-direction-ltr .fc-daygrid-event.fc-event-start, .fc-direction-rtl .fc-daygrid-event.fc-event-end': {
    marginLeft: margins.left4,
    marginBottom: margins.bottom8,
    borderRadius: borderRadius.radius8
  },

  '& .fc-h-event .fc-event-main': {
    padding: paddings.all4,
    paddingLeft: paddings.left8
  },

  // popover when multiple events
  '& .fc .fc-more-popover': {
    border: 'none',
    borderRadius: borderRadius.radius12
  },

  '& .fc .fc-more-popover .fc-popover-body': {
    backgroundColor: theme.palette.grey[200],
    borderBottomLeftRadius: borderRadius.radius12,
    borderBottomRightRadius: borderRadius.radius12
  },

  '& .fc .fc-popover-header': {
    padding: 12,
    borderTopLeftRadius: borderRadius.radius12,
    borderTopRightRadius: borderRadius.radius12,
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.text.primary
  },

  // agenda view
  '& .fc-theme-standard .fc-list-day-cushion': {
    backgroundColor: theme.palette.grey[100]
  },

  '& .fc .fc-list-event:hover td': {
    backgroundColor: theme.palette.grey[100]
  },

  '& .fc-timegrid-event-harness-inset .fc-timegrid-event, .fc-timegrid-event.fc-event-mirror, .fc-timegrid-more-link': {
    padding: paddings.all8,
    margin: margins.all2
  }
}));

export default CalendarWrapper;
