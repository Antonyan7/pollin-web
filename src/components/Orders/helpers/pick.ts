export const pick = <V, T extends Record<string, V>>(object: T, keys: string[]): T =>
  Object.keys(object)
    .filter((key: string) => keys.includes(key))
    .reduce((acc: Record<string, V>, key: string) => {
      acc[key] = object[key] as V;

      return acc as T;
    }, {} as T);
