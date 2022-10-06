// assets
import React from 'react';
import { IconCirclePlus } from '@tabler/icons';
import { OverrideIcon } from 'types';

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
  title: <h3>Scheduling</h3>,
  type: 'group',
  children: [
    {
      id: 'scheduleTemplates',
      title: 'Schedule Templates',
      type: 'item',
      url: '/scheduling/schedule-templates',
      icon: IconCirclePlus,
      breadcrumbs: false
    },
    {
      id: 'applySchedule',
      title: 'Apply Schedule',
      type: 'item',
      url: '/scheduling/apply-schedule',
      icon: IconCirclePlus,
      breadcrumbs: false
    },
    {
      id: 'blockSchedule',
      title: 'Block Schedule',
      type: 'item',
      url: '/scheduling/block-schedule',
      icon: IconCirclePlus,
      breadcrumbs: false
    }
  ]
};

export default NavScheduling;
