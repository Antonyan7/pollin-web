export const convertStringDateToDate = (date: string) => date && new Date(date).setHours(0, 0, 0, 0);
