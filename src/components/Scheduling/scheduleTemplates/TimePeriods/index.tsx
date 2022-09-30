import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box, Divider } from '@mui/material';
import { Translation } from 'constants/translations';
import { ITemplateGroup, PeriodType } from 'types/create-schedule';

import CreateSchedulingTemplateStyled from '../../CreateSchedulingStyled';

import PlaceholderLabelField from './fields/PlaceholderLabelField';
import ServiceField from './fields/ServiceField';
import ServiceTypesField from './fields/ServiceTypesField';
import TimeField from './fields/TimeField';
import WeekDaysField from './fields/WeekDaysField';
import TimePeriodsRow from './TimePeriodsRow';
import TimePeriodsTitle from './TimePeriodsTitle';

// This component exists just because to avoid re-rendering of the whole form on the timePeriods field change
const ServiceTypesRow: React.FC<{ index: number }> = ({ index }) => {
  const [t] = useTranslation();

  useWatch({
    name: 'timePeriods'
  });

  const { getValues } = useFormContext<ITemplateGroup>();

  return (
    <React.Fragment key={index}>
      {getValues(`timePeriods.${index}.periodType`) === PeriodType.ServiceType && (
        <TimePeriodsRow title={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_SERVICE_TYPES)}>
          <ServiceTypesField index={index} />
        </TimePeriodsRow>
      )}
    </React.Fragment>
  );
};

export const TimePeriods = () => {
  const [t] = useTranslation();
  const { getValues } = useFormContext<ITemplateGroup>();

  return (
    <>
      {getValues('timePeriods').map((singleTemplate, index) => (
        <React.Fragment key={`${singleTemplate?.id ?? index}`}>
          <CreateSchedulingTemplateStyled>
            <div className="create-scheduling-template">
              <Box key={`timePeriod-${singleTemplate.id}`}>
                <TimePeriodsTitle timePeriodNumber={index} />
                <TimePeriodsRow title={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_SELECT)}>
                  <WeekDaysField index={index} singleTemplate={singleTemplate} />
                </TimePeriodsRow>
                <TimePeriodsRow title={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_START)}>
                  <TimeField
                    fieldLabel={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_START)}
                    fieldName="startTime"
                    index={index}
                  />
                </TimePeriodsRow>
                <TimePeriodsRow title={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_END)}>
                  <TimeField
                    fieldLabel={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_END)}
                    fieldName="endTime"
                    index={index}
                  />
                </TimePeriodsRow>
                <TimePeriodsRow title={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_PERIOD_TYPE)}>
                  <ServiceField index={index} />
                </TimePeriodsRow>
                <ServiceTypesRow index={index} />
                <TimePeriodsRow title={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_PLACEHOLDER)}>
                  <PlaceholderLabelField index={index} />
                </TimePeriodsRow>
                <Divider />
              </Box>
            </div>
          </CreateSchedulingTemplateStyled>
        </React.Fragment>
      ))}
    </>
  );
};
