import { NavItemType } from 'types';

import Booking from './Booking';
import NavPatients from './NavPatients';
import NavScheduling from './NavScheduling';
import Results from './Results';
import Specimens from './Specimens';

const menuItems: { items: NavItemType[] } = {
  items: [NavPatients, Booking, NavScheduling, Results, Specimens]
};

export default menuItems;
