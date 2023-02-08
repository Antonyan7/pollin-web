import React from 'react';
import ReorderIcon from '@mui/icons-material/Reorder';
import ViewDayIcon from '@mui/icons-material/ViewDay';
import { IconTable } from '@tabler/icons';
import { Translation } from 'constants/translations';
import { t } from 'i18next';
import { OverrideIcon } from 'types';

import NavbarTitle from './NavbarTitle';

interface NavSchedulingProps {
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

const NavScheduling: NavSchedulingProps = {
  id: 'Scheduling',
  title: <NavbarTitle>{t(Translation.NAVIGATION_TAB_ITEM_SCHEDULING)}</NavbarTitle>,
  type: 'group',
  children: [
    {
      id: 'scheduleTemplates',
      title: 'Schedule Templates',
      type: 'item',
      url: '/scheduling/schedule-templates',
      icon: ReorderIcon,
      breadcrumbs: false
    },
    {
      id: 'applySchedule',
      title: 'Apply Schedule',
      type: 'item',
      url: '/scheduling/apply-schedule',
      icon: IconTable,
      breadcrumbs: false
    },
    {
      id: 'blockSchedule',
      title: 'Block Schedule',
      type: 'item',
      url: '/scheduling/block-schedule',
      icon: ViewDayIcon,
      breadcrumbs: false
    }
  ]
};

export default NavScheduling;
