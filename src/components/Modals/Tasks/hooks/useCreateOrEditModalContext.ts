import { useContext, useMemo } from 'react';

import { CreateOrEditModalContext } from '../context/CreateOrEditModalContext';

export const useCreateOrEditModalContext = () => {
  const task = useContext(CreateOrEditModalContext);

  return useMemo(() => task, [task]);
};
