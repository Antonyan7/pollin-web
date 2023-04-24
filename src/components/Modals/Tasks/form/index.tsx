import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { dispatch, useAppSelector } from '@redux/hooks';
import { staffSelector } from '@redux/slices/staff';
import { tasksMiddleware } from '@redux/slices/tasks';
import { Translation } from 'constants/translations';
import { findAssigneeById } from 'helpers/tasks';

import { useCreateOrEditModalContext } from '../hooks/useCreateOrEditModalContext';
import { ICreateOrEditTaskForm } from '../types';

import FormBody from './FormBody';
import FormHeader from './FormHeader';
import { initialValues } from './initialValues';

const CreateOrEditTaskModalForm = ({ taskId }: { taskId?: string }) => {
  const [t] = useTranslation();
  const staffUsers = useAppSelector(staffSelector.staffUsers);
  const task = useCreateOrEditModalContext();
  const { staff } = staffUsers;
  const methods = useForm({
    mode: 'onSubmit',
    defaultValues: task ?? initialValues
  });

  const { handleSubmit } = methods;

  const onCreateSubmit = (values: ICreateOrEditTaskForm) => {
    const assigneeName = findAssigneeById(values.assign ?? '', staff)?.name;
    const message = `${t(Translation.PAGE_TASKS_MANAGER_TOAST_SUCCESSFUL_CREATE)} ${assigneeName}`;

    dispatch(tasksMiddleware.createTask(values, message));
  };

  const onEditSubmit = (values: ICreateOrEditTaskForm) => {
    const message = `${t(Translation.PAGE_TASKS_MANAGER_TOAST_SUCCESSFUL_UPDATE)}`;

    if (taskId) {
      dispatch(tasksMiddleware.editTask(taskId, values, message));
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(task ? onEditSubmit : onCreateSubmit)}>
        <FormHeader />
        <FormBody />
      </form>
    </FormProvider>
  );
};

export default CreateOrEditTaskModalForm;
