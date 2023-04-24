import { createContext } from 'react';

import { ICreateOrEditTaskForm } from '../types';

export const CreateOrEditModalContext = createContext<ICreateOrEditTaskForm | null>(null);
