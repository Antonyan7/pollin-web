// WEEKS ARRAY: FROM 1 to 24
// We do in this way to avoid additional complexity adding to make understandable format for autocomplete
export const AVAILABLE_REPEAT_WEEKS: string[] = [...Array(23).keys()].map((x) => `${x + 1}`);

export const TODAYS_DATE = new Date().setHours(0, 0, 0, 0);
