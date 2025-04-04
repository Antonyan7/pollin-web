import React from 'react';
import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';
import { Translation } from 'constants/translations';
import { t } from 'i18next';
import { OverrideIcon } from 'types';

import CheckinIcon from '@assets/icons/Checkin';

import NavbarTitle from './NavbarTitle';

interface BookingProps {
  id: string;
  title: React.ReactNode | string;
  type: string;
  children: {
    id: string;
    title: React.ReactNode | string;
    type: string;
    url: string;
    icon: OverrideIcon['overrideIcon'];
    breadcrumbs: boolean;
  }[];
}

const Booking: BookingProps = {
  id: 'Booking',
  title: <NavbarTitle>{t(Translation.NAVIGATION_TAB_ITEM_BOOKING)}</NavbarTitle>,
  type: 'group',
  children: [
    {
      id: 'Appointments',
      title: t(Translation.PAGE_PATIENT_PROFILE_APPOINTMENTS_LIST_TITLE),
      type: 'item',
      url: '/booking/appointments',
      icon: CalendarTodayTwoToneIcon,
      breadcrumbs: false
    },
    {
      id: 'Check in',
      title: t(Translation.PAGE_PATIENT_CHECK_IN_TITLE),
      type: 'item',
      url: '/booking/check-in',
      icon: CheckinIcon,
      breadcrumbs: false
    }
  ]
};

export default Booking;
