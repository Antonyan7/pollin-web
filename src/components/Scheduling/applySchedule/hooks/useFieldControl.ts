import { useController, useFormContext } from 'react-hook-form';

const useFieldControl = (fieldName: string) => {
  const { control } = useFormContext();

  const fieldControl = useController({
    name: fieldName,
    control
  });

  return fieldControl;
};

export default useFieldControl;
