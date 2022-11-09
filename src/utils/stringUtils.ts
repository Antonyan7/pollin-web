export const capitalizeFirst = <T extends string>(str: string): T => (str.charAt(0).toUpperCase() + str.slice(1)) as T;

export const getFileExtension = (filename: string) => {
  const dotIndex = filename.lastIndexOf('.');

  return dotIndex >= 0 ? filename.substring(dotIndex) : '';
};
