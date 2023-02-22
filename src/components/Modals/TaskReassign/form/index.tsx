import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { dispatch, useAppSelector } from '@redux/hooks';
import { staffSelector } from '@redux/slices/staff';
import { tasksMiddleware, tasksSelector } from '@redux/slices/tasks';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { findAssigneeById } from 'helpers/tasks';
import { ModalName } from 'types/modals';

import FormBody from './FormBody';
import FormHeader from './FormHeader';
import { ICreateTaskForm, initialValues } from './initialValues';

const ReassignTaskModalForm = ({ id }: { id: string }) => {
  const [t] = useTranslation();
  const staffUsers = useAppSelector(staffSelector.staffUsers);
  const taskDetails = useAppSelector(tasksSelector.taskDetails);
  const { staff } = staffUsers;
  const methods = useForm({
    mode: 'onSubmit',
    defaultValues: initialValues
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (values: ICreateTaskForm) => {
    const assigneeName = findAssigneeById(values.assign, staff)?.name;
    const message = `${t(Translation.PAGE_TASKS_MANAGER_TOAST_SUCCESSFUL_REASSIGN)} ${assigneeName}`;
    const { assign, notes } = values;
    const data = {
      staffUserId: assign,
      taskId: id,
      ...(notes ? { reassignNotes: notes } : {})
    };

    dispatch(tasksMiddleware.reassignTask(data, message));
    dispatch(viewsMiddleware.closeModal(ModalName.ReassignTaskModal));
  };

  useEffect(() => {
    reset({
      taskName: taskDetails.name,
      description: taskDetails.description,
      dueDate: taskDetails.dueDate,
      patient: taskDetails.patient?.name,
      priority: taskDetails.priorityId,
      assign: ''
    });
  }, [reset, taskDetails]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormHeader />
        <FormBody />
      </form>
    </FormProvider>
  );
};

export default ReassignTaskModalForm;
