import React from 'react';
import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';
import { Translation } from 'constants/translations';
import { t } from 'i18next';
import { OverrideIcon } from 'types';

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
      title: 'Appointments',
      type: 'item',
      url: '/booking/appointments',
      icon: CalendarTodayTwoToneIcon,
      breadcrumbs: false
    }
  ]
};

export default Booking;
