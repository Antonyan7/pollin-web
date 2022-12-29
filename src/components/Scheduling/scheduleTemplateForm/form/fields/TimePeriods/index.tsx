import React from 'react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import useTimePeriodsContext from '@components/Scheduling/scheduleTemplateForm/hooks/useTimePeriodsContext';
import CreateSchedulingTemplateStyled from '@components/Scheduling/scheduleTemplateForm/styled/CreateSchedulingStyled';
import { Box, Divider } from '@mui/material';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { PeriodType } from 'types/create-schedule';

import PlaceholderLabelField from './fields/PlaceholderLabelField';
import ServiceField from './fields/ServiceField';
import ServiceTypesField from './fields/ServiceTypesField';
import TimeField from './fields/TimeField';
import WeekDaysField from './fields/WeekDaysField';
import TimePeriodsRow from './TimePeriodsRow';
import TimePeriodsTitle from './TimePeriodsTitle';

// This component exists just because to avoid re-rendering of the whole form on the ServiceTypesField field change
const ServiceTypesRow: React.FC<{ index: number }> = ({ index }) => {
  const [t] = useTranslation();

  const periodType = useWatch({
    name: `timePeriods.${index}.periodType`
  });

  return periodType === PeriodType.ServiceType ? (
    <TimePeriodsRow title={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_SERVICE_TYPES)}>
      <ServiceTypesField index={index} />
    </TimePeriodsRow>
  ) : null;
};

export const TimePeriods = () => {
  const [t] = useTranslation();
  const { fields } = useTimePeriodsContext();

  const startTimeCyId = CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_START;
  const endTimeCyId = CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_END;

  return fields.length > 0 ? (
    <>
      {fields.map((field, index) => (
        <CreateSchedulingTemplateStyled key={field.id}>
          <div className="create-scheduling-template">
            <Box>
              <TimePeriodsTitle timePeriodNumber={index} />
              <TimePeriodsRow title={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_SELECT)}>
                <WeekDaysField index={index} />
              </TimePeriodsRow>
              <TimePeriodsRow title={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_START)}>
                <TimeField
                  dataCy={startTimeCyId}
                  fieldLabel={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_START)}
                  fieldName="startTime"
                  index={index}
                />
              </TimePeriodsRow>
              <TimePeriodsRow title={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_END)}>
                <TimeField
                  dataCy={endTimeCyId}
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
      ))}
    </>
  ) : null;
};
