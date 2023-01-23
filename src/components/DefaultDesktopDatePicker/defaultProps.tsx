import { PopperPlacementType, Theme } from '@mui/material';
import {
  calendarPickerClasses,
  CalendarPickerView,
  dayPickerClasses,
  pickersCalendarHeaderClasses,
  pickersDayClasses,
  pickersFadeTransitionGroupClasses
} from '@mui/x-date-pickers';
import { margins, paddings } from 'themes/themeConstants';

// TODO: Make DesktopDatePicker one component with updated styles.
const getDesktopDatePickerDefaultProps = (theme: Theme) => ({
  PopperProps: {
    placement: 'bottom-start' as PopperPlacementType,
    sx: {
      width: 300
    }
  },
  componentsProps: {
    leftArrowButton: {
      sx: {
        color: theme.palette.primary.main
      }
    },
    rightArrowButton: {
      sx: {
        color: theme.palette.primary.main
      }
    }
  },
  PaperProps: {
    sx: {
      mt: margins.top8,
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: 4,
      background: theme.palette.secondary.light,
      [`.${calendarPickerClasses.root}`]: {
        width: 300,
        maxHeight: 336,
        m: 0
      },
      [`.${pickersFadeTransitionGroupClasses.root}`]: {
        color: theme.palette.secondary[800]
      },
      [`.${pickersCalendarHeaderClasses.label}`]: {
        color: theme.palette.secondary[800],
        fontWeight: 600
      },
      [`.MuiPickersArrowSwitcher-spacer `]: {
        width: 12
      },
      [`.${dayPickerClasses.weekDayLabel}`]: {
        color: theme.palette.secondary[800],
        fontWeight: 600
      },
      [`.${pickersDayClasses.today}:not(.Mui-selected)`]: {
        border: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main
      },
      [`.${pickersDayClasses.dayWithMargin}`]: {
        background: 'transparent',
        color: theme.palette.secondary[800],
        fontWeight: 600
      },
      [`.${pickersDayClasses.selected}`]: {
        background: theme.palette.primary.main,
        color: theme.palette.common.white,
        border: 0
      }
    }
  },
  OpenPickerButtonProps: {
    sx: {
      px: paddings.leftRight12
    },
    disableRipple: true
  },
  views: ['day'] as CalendarPickerView[]
});

export default getDesktopDatePickerDefaultProps;
