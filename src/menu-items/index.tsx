import { NavItemType } from 'types';

import Booking from './Booking';
import NavPatients from './NavPatients';
import NavScheduling from './NavScheduling';

const menuItems: { items: NavItemType[] } = {
  items: [NavPatients, Booking, NavScheduling]
};

export default menuItems;
