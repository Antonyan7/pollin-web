// assets
import React from 'react';
import { IconCirclePlus } from '@tabler/icons';
import { OverrideIcon } from 'types';

interface NavHeading3Props {
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

const NavHeading3: NavHeading3Props = {
  id: 'Nav_Heading_3',
  title: <h3>Nav Heading 3</h3>,
  type: 'group',
  children: [
    {
      id: 'head7',
      title: 'Head7',
      type: 'item',
      url: '/head7',
      icon: IconCirclePlus,
      breadcrumbs: false
    },
    {
      id: 'head8',
      title: 'head8',
      type: 'item',
      url: '/head8',
      icon: IconCirclePlus,
      breadcrumbs: false
    },
    {
      id: 'head9',
      title: 'head9',
      type: 'item',
      url: '/head9',
      icon: IconCirclePlus,
      breadcrumbs: false
    }
  ]
};

export default NavHeading3;
