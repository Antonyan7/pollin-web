export const getEnumKeyByEnumValue = <E extends Record<string, string>>(
  targetEnum: E,
  targetEnumValue: string | E
): string => {
  const key = Object.keys(targetEnum).find((x) => targetEnum[x] === targetEnumValue) ?? '';

  return key;
};
