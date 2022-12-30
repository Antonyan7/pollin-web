import React from 'react';
import { FieldValues, SubmitHandler, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import useIsScheduleButtonActive from '@components/Scheduling/scheduleTemplateForm/hooks/useIsSaveButtonActive';
import useScheduleFormContext from '@components/Scheduling/scheduleTemplateForm/hooks/useScheduleFormContext';
import { dispatch, useAppSelector } from '@redux/hooks';
import { coreSelector } from '@redux/slices/core';
import { schedulingMiddleware, schedulingSelector } from '@redux/slices/scheduling';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { borderRadius, paddings } from 'themes/themeConstants';
import { ISingleTemplate, ITemplateGroup, PeriodType } from 'types/create-schedule';

import { ButtonWithLoading } from '@ui-component/common/buttons';
import { calculateTimeInUTC, changeDateSameTimeString, convertToLocale } from '@utils/dateUtils';

const SaveButton = () => {
  const [t] = useTranslation();
  const isScheduleLoading = useAppSelector(schedulingSelector.scheduleLoading);
  const { currentDate } = useAppSelector(coreSelector.clinicConfigs);
  const { scheduleId } = useScheduleFormContext();
  const saveButtonCyId = scheduleId
    ? CypressIds.PAGE_SCHEDULING_EDIT_TEMPLATES_BUTTON_SAVE
    : CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_BUTTON_SAVE;
  const saveButtonLabel = scheduleId
    ? t(Translation.PAGE_SCHEDULING_EDIT_TEMPLATES_BUTTON_SAVE)
    : t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_BUTTON_SAVE);

  const isSaveButtonActive = useIsScheduleButtonActive();

  const { handleSubmit } = useFormContext();
  const handleSaveClick = (values: ITemplateGroup) => {
    const body: ITemplateGroup = {
      ...values,
      timePeriods: values.timePeriods.map((item) => {
        const { id, serviceTypes, ...rest } = item;

        const reqBody: ISingleTemplate = rest;

        if (item.periodType === PeriodType.ServiceType) {
          reqBody.serviceTypes = serviceTypes;
        }

        if (rest.startTime && rest.endTime) {
          if (!scheduleId) {
            reqBody.startTime = changeDateSameTimeString(calculateTimeInUTC(rest.startTime), currentDate);
            reqBody.endTime = changeDateSameTimeString(calculateTimeInUTC(rest.endTime), currentDate);
          } else {
            reqBody.startTime = changeDateSameTimeString(
              calculateTimeInUTC(convertToLocale(rest.startTime)),
              currentDate
            );
            reqBody.endTime = changeDateSameTimeString(calculateTimeInUTC(convertToLocale(rest.endTime)), currentDate);
          }
        }

        return reqBody;
      })
    };

    if (scheduleId) {
      dispatch(schedulingMiddleware.updateSingleSchedule(scheduleId, body));
    } else {
      dispatch(schedulingMiddleware.createScheduleTemplate(body));
    }
  };

  return (
    <ButtonWithLoading
      data-cy={saveButtonCyId}
      isLoading={isScheduleLoading}
      disabled={!isSaveButtonActive}
      onClick={() => handleSubmit(handleSaveClick as SubmitHandler<FieldValues>)()}
      color="primary"
      variant="contained"
      type="submit"
      sx={{
        px: paddings.leftRight4,
        borderRadius: borderRadius.radius8,
        height: 45
      }}
    >
      {saveButtonLabel}
    </ButtonWithLoading>
  );
};

export default SaveButton;
