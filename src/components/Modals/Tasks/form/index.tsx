import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { dispatch, useAppSelector } from '@redux/hooks';
import { staffSelector } from '@redux/slices/staff';
import { tasksMiddleware } from '@redux/slices/tasks';
import { Translation } from 'constants/translations';
import { findAssigneeById } from 'helpers/tasks';

import FormBody from './FormBody';
import FormHeader from './FormHeader';
import { ICreateTaskForm, initialValues } from './initialValues';

const CreateTaskModalForm = () => {
  const [t] = useTranslation();
  const staffUsers = useAppSelector(staffSelector.staffUsers);
  const { staff } = staffUsers;
  const methods = useForm({
    mode: 'onSubmit',
    defaultValues: initialValues
  });

  const { handleSubmit } = methods;

  const onSubmit = (values: ICreateTaskForm) => {
    const assigneeName = findAssigneeById(values.assign, staff)?.name;
    const message = `${t(Translation.PAGE_TASKS_MANAGER_TOAST_SUCCESSFUL_CREATE)} ${assigneeName}`;

    dispatch(tasksMiddleware.createTask(values, message));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormHeader />
        <FormBody />
      </form>
    </FormProvider>
  );
};

export default CreateTaskModalForm;
