// assets
import React from 'react';
import { IconCirclePlus } from '@tabler/icons';
import { OverrideIcon } from 'types';

interface NavHeading2Props {
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

const NavHeading2: NavHeading2Props = {
  id: 'Nav_Heading_2',
  title: <h3>Scheduling</h3>,
  type: 'group',
  children: [
    {
      id: 'head4',
      title: 'Schedule Templates',
      type: 'item',
      url: '/head4',
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
      id: 'head6',
      title: 'Block Schedule',
      type: 'item',
      url: '/head6',
      icon: IconCirclePlus,
      breadcrumbs: false
    }
  ]
};

export default NavHeading2;
