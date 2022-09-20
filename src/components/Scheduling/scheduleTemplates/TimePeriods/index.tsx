import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Divider } from '@mui/material';
import { Translation } from 'constants/translations';
import { IServiceType } from 'types/reduxTypes/booking';

import { useAppSelector } from '../../../../redux/hooks';
import { schedulingSelector } from '../../../../redux/slices/scheduling';
import { ISingleTemplate, ITemplateGroup, ServiceTypeOrBlock } from '../../../../types/create-schedule';
import CreateSchedulingTemplateStyled from '../../CreateSchedulingStyled';

import PlaceholderLabelField from './fields/PlaceholderLabelField';
import ServiceField from './fields/ServiceField';
import ServiceTypesField from './fields/ServiceTypesField';
import TimeField from './fields/TimeField';
import WeekDaysField from './fields/WeekDaysField';
import TimePeriodsRow from './TimePeriodsRow';
import TimePeriodsTitle from './TimePeriodsTitle';

interface ITimePeriodsProps {
  timePeriods: ISingleTemplate[];
  setTemplateData: React.Dispatch<React.SetStateAction<ITemplateGroup>>;
}

export const TimePeriods = ({ timePeriods, setTemplateData }: ITimePeriodsProps) => {
  const serviceTypes: IServiceType[] = useAppSelector(schedulingSelector.serviceTypes);
  const [t] = useTranslation();

  const updateInputValue = (
    input: keyof ISingleTemplate,
    value: string | undefined | boolean | string[],
    itemIndex: number,
    indexOfDay?: number
  ) => {
    setTemplateData((templateData) => ({
      ...templateData,
      timePeriods: templateData.timePeriods.map((data, index) => {
        // updating days
        if (index === itemIndex && indexOfDay !== undefined) {
          return {
            ...data,
            [input]: value ? [...data.days, indexOfDay] : data.days.filter((item) => item !== indexOfDay)
          };
        }

        // updating other fields
        if (index === itemIndex) {
          return {
            ...data,
            [input]: value
          };
        }

        // couldn't identify what to update
        return {
          ...data
        };
      })
    }));
  };

  return (
    <>
      {timePeriods.map((singleTemplate, index) => (
        <React.Fragment key={`${singleTemplate?.id ?? index}`}>
          <Divider sx={{ margin: '24px 0px 12px', display: timePeriods.length ? 'none' : 'block' }} />
          <CreateSchedulingTemplateStyled>
            <div className="create-scheduling-template">
              <Box key={`timePeriod-${singleTemplate.id}`}>
                <TimePeriodsTitle timePeriodNumber={index} setTemplateData={setTemplateData} />
                <div className="splitter-line" />
                <TimePeriodsRow title={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_SELECT)}>
                  <WeekDaysField index={index} singleTemplate={singleTemplate} updateInputValue={updateInputValue} />
                </TimePeriodsRow>
                <TimePeriodsRow title={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_START)}>
                  <TimeField
                    fieldLabel={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_START)}
                    fieldName="startTime"
                    index={index}
                    updateInputValue={updateInputValue}
                    singleTemplate={singleTemplate}
                  />
                </TimePeriodsRow>
                <TimePeriodsRow title={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_END)}>
                  <TimeField
                    fieldLabel={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_END)}
                    fieldName="endTime"
                    index={index}
                    updateInputValue={updateInputValue}
                    singleTemplate={singleTemplate}
                  />
                </TimePeriodsRow>
                <TimePeriodsRow title={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_PERIOD_TYPE)}>
                  <ServiceField index={index} updateInputValue={updateInputValue} singleTemplate={singleTemplate} />
                </TimePeriodsRow>
                {singleTemplate.periodType === ServiceTypeOrBlock.ServiceType && (
                  <TimePeriodsRow title={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_SERVICE_TYPES)}>
                    <ServiceTypesField index={index} updateInputValue={updateInputValue} serviceTypes={serviceTypes} />
                  </TimePeriodsRow>
                )}
                <TimePeriodsRow title={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_PLACEHOLDER)}>
                  <PlaceholderLabelField
                    index={index}
                    updateInputValue={updateInputValue}
                    singleTemplate={singleTemplate}
                  />
                </TimePeriodsRow>
                <div className="splitter-line" />
              </Box>
            </div>
          </CreateSchedulingTemplateStyled>

          <Divider sx={{ margin: '12px 0px' }} />
        </React.Fragment>
      ))}
    </>
  );
};
