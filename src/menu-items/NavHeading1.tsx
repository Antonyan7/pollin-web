// assets
import React from 'react';
import { IconCirclePlus } from '@tabler/icons';
import { OverrideIcon } from 'types';

interface NavHeading1Props {
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

const NavHeading1: NavHeading1Props = {
  id: 'Nav_Heading_1',
  title: <h3>Nav Heading 1</h3>,
  type: 'group',
  children: [
    {
      id: 'Appointments',
      title: 'Appointments',
      type: 'item',
      url: '/appointments',
      icon: IconCirclePlus,
      breadcrumbs: false
    },
    {
      id: 'head2',
      title: 'head2',
      type: 'item',
      url: '/head2',
      icon: IconCirclePlus,
      breadcrumbs: false
    },
    {
      id: 'head3',
      title: 'head3',
      type: 'item',
      url: '/head3',
      icon: IconCirclePlus,
      breadcrumbs: false
    }
  ]
};

export default NavHeading1;
