export const calculateWeekDays = (weekDays: number[]) =>
  weekDays.map((day) => {
    if (day === 6) {
      return 0;
    }

    return day + 1;
  });
