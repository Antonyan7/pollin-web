export const calculateWeekByNumber = (day: number) => {
  if (day === 6) {
    return 0;
  }

  return day + 1;
};

export const calculateWeekDays = (weekDays: number[]) => weekDays.map((day) => calculateWeekByNumber(day));
