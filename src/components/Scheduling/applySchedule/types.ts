export enum ApplyScheduleFields {
  RESOURCE = 'resource',
  SCHEDULE_TEMPLATE = 'scheduleTemplate',
  WEEKS_REPEAT_COUNT = 'weeksRepeatCount',
  START_SCHEDULE_DATE = 'startScheduleDate',
  END_SCHEDULE_DATE = 'endScheduleDate',
  SELECTED_WEEKDAYS_TO_APPLY = 'selectedWeekdaysToApply'
}

export interface DatePickerFieldProps {
  label: string;
  value: Date | null;
  onChange: (value: React.SetStateAction<Date | null>) => void;
  errorMessage: string;
  dataCy?: string;
}

export interface ApplyScheduleFormRowProps {
  title: string;
  children: React.ReactNode;
  isHidden?: boolean;
}

export interface ApplyScheduleButtonProps {
  isAllowedToApplySchedule: boolean;
  handleApplySchedule: () => void;
}
