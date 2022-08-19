import { format } from 'date-fns';

export const toIsoString = (value: Date) => format(value, "yyyy-MM-dd'T'HH:mm:ss'+00:00'");
