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
  title: <h3>Nav Heading 2</h3>,
  type: 'group',
  children: [
    {
      id: 'head4',
      title: 'head4',
      type: 'item',
      url: '/head4',
      icon: IconCirclePlus,
      breadcrumbs: false
    },
    {
      id: 'head5',
      title: 'head5',
      type: 'item',
      url: '/head5',
      icon: IconCirclePlus,
      breadcrumbs: false
    },
    {
      id: 'head6',
      title: 'head6',
      type: 'item',
      url: '/head6',
      icon: IconCirclePlus,
      breadcrumbs: false
    }
  ]
};

export default NavHeading2;
