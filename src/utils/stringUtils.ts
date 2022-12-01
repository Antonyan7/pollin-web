/* eslint-disable @typescript-eslint/ban-types */
export const capitalizeFirst = <T extends string>(str: string): T => (str.charAt(0).toUpperCase() + str.slice(1)) as T;

export const getFileExtension = (filename: string) => {
  const dotIndex = filename.lastIndexOf('.');

  return dotIndex >= 0 ? filename.substring(dotIndex) : '';
};

export const toQueryString = (queryParams?: Record<string, string | string[] | undefined>): string => {
  if (!queryParams || Object.keys(queryParams).length === 0) {
    return '';
  }

  return `?${Object.entries(queryParams)
    .reduce<string[]>((collectedQueryParams, [paramKey, paramValue]) => {
      if (paramValue === undefined) {
        return collectedQueryParams;
      }

      if (typeof paramValue === 'string') {
        return [...collectedQueryParams, `${paramKey}=${paramValue}`];
      }

      const formattedQueryParams = paramValue.map((value) => `${paramKey}=${value}`);

      return [...collectedQueryParams, ...formattedQueryParams];
    }, [])
    .join('&')}`;
};
