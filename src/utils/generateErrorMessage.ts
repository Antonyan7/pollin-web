export const generateErrorMessage = (fieldName: string) => {
  const requiredFieldMessage = 'is required';

  return `${fieldName} ${requiredFieldMessage}`;
};
