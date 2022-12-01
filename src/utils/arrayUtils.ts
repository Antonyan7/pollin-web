export const arraysShallowEqual = <T>(firstArray: T[], secondArray: T[]) => {
  if (firstArray === secondArray) {
    return true;
  }

  if (firstArray.length !== secondArray.length) {
    return false;
  }

  for (let i = 0; i < firstArray.length; i += 1) {
    if (firstArray[i] !== secondArray[i]) {
      return false;
    }
  }

  return true;
};
