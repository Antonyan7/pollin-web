import { NavItemType } from 'types';

import Booking from './Booking';
import NavScheduling from './NavScheduling';

const menuItems: { items: NavItemType[] } = {
  items: [Booking, NavScheduling]
};

export default menuItems;
