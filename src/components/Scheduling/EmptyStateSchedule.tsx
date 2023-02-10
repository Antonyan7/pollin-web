import React from 'react';
import { useTranslation } from 'react-i18next';
import NoResultsFound from '@components/NoResultsFound';
import { useAppSelector } from '@redux/hooks';
import { schedulingSelector } from '@redux/slices/scheduling';
import { Translation } from 'constants/translations';

const EmptyScheduleState = () => {
  const [t] = useTranslation();
  const notFoundLabel = t(Translation.PAGE_SCHEDULING_TEMPLATES_NOT_FOUND);
  const scheduleTemplates = useAppSelector(schedulingSelector.scheduleTemplates);

  return !scheduleTemplates.templates.length ? <NoResultsFound label={notFoundLabel} /> : null;
};

export default EmptyScheduleState;
