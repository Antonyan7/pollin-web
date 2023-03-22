import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import useOnSpecimenCollectionEventClick from '@components/SpecimenCollection/hooks/useOnSpecimenCollectionEventClick';
import SpecimenCollectionHeader from '@components/SpecimenCollection/SpecimenCollectionHeader';
import { Paper, Stack } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { bookingMiddleware, bookingSelector } from '@redux/slices/booking';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { margins, paddings } from 'themes/themeConstants';

import { DateUtil } from '@utils/date/DateUtil';

const DynamicCalendar = dynamic(() => import('ui-component/calendar'));

const SpecimenCollection = () => {
  const [t] = useTranslation();

  const onCalendarEventClick = useOnSpecimenCollectionEventClick();
  const calendarDisabledStateTitle = t(Translation.PAGE_SPECIMEN_COLLECTION_CALENDAR_TITLE_DISABLED);

  const calendarDate = useSelector(bookingSelector.specimenCollectionCalendarDate);
  const isLoading = useSelector(bookingSelector.isCollectionCalendarLoading);
  const { list } = useSelector(bookingSelector.specimenAppointments);

  const router = useRouter();
  const serviceProviderId = useAppSelector(bookingSelector.specimenServiceProviderId);
  const selectedSpecimenAppointmentsFilters = useAppSelector(bookingSelector.selectedSpecimenAppointmentsFilters);

  useEffect(() => {
    if (router.isReady) {
      if (router.query.date) {
        dispatch(bookingMiddleware.updateCollectionCalendarDate(new Date(router.query.date as string)));
      }

      if (router.query.resource) {
        dispatch(bookingMiddleware.updateSpecimenResourceId(router.query.resource as string));
      }
    }
    // We are disabling this since linter is asking for router props date and resource include in deps, but it shouldn't
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  useEffect(() => {
    router.push({
      query: {
        ...(serviceProviderId
          ? {
              resource: serviceProviderId
            }
          : {}),
        ...(calendarDate ? { date: DateUtil.convertToDateOnly(calendarDate) } : {})
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarDate, serviceProviderId]);

  useEffect(() => {
    if (serviceProviderId) {
      dispatch(
        bookingMiddleware.getSpecimenAppointments(
          serviceProviderId,
          calendarDate,
          selectedSpecimenAppointmentsFilters.map(({ id }) => ({ id }))
        )
      );
    } else {
      dispatch(bookingMiddleware.clearSpecimenAppointments());
    }
  }, [serviceProviderId, calendarDate, selectedSpecimenAppointmentsFilters]);

  return (
    <Stack gap={margins.all16}>
      <MainBreadcrumb
        data-cy={CypressIds.PAGE_SPECIMEN_COLLECTION_TITLE}
        currentPage={t(Translation.PAGE_SPECIMEN_COLLECTION_TITLE)}
        navigation={{
          basePath: '/',
          items: [
            {
              name: `${t(Translation.PAGE_SPECIMEN_COLLECTION_TITLE)}`,
              path: 'clinic-test-results/specimen-collection'
            }
          ]
        }}
      />
      <Paper elevation={0}>
        <Stack px={paddings.all24} py={paddings.all12} gap={8}>
          <SpecimenCollectionHeader />
        </Stack>
        <Stack px={paddings.all24}>
          <DynamicCalendar
            calendarDate={calendarDate}
            onEventClick={onCalendarEventClick}
            disable={{ title: calendarDisabledStateTitle, state: !serviceProviderId }}
            appointments={{ list, isLoading }}
          />
        </Stack>
      </Paper>
    </Stack>
  );
};

export default SpecimenCollection;
