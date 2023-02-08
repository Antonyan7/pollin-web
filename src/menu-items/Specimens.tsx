import React from 'react';
import { LocalShippingTwoTone } from '@mui/icons-material';
import { IconFlask } from '@tabler/icons';
import { Translation } from 'constants/translations';
import { t } from 'i18next';
import { OverrideIcon } from 'types';

import NavbarTitle from './NavbarTitle';

interface SpecimensProps {
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

const Specimens: SpecimensProps = {
  id: 'Specimens',
  title: <NavbarTitle>{t(Translation.NAVIGATION_TAB_ITEM_SPECIMENS)}</NavbarTitle>,
  type: 'group',
  children: [
    {
      id: 'specimenCollection',
      title: t(Translation.PAGE_SPECIMEN_COLLECTION_TITLE),
      type: 'item',
      url: '/clinic-test-results/specimen-collection',
      icon: IconFlask,
      breadcrumbs: false
    },
    {
      id: 'specimenTracking',
      title: t(Translation.PAGE_SPECIMENS_TRACKING_TITLE),
      type: 'item',
      url: '/clinic-test-results/specimen-tracking/all-tests',
      icon: LocalShippingTwoTone,
      breadcrumbs: false
    }
  ]
};

export default Specimens;
