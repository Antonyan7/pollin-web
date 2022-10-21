import React from 'react';
import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';
import { OverrideIcon } from 'types';

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
  title: <h3>Booking</h3>,
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
