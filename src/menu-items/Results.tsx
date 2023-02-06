import React from 'react';
import { KeyboardDoubleArrowLeftOutlined } from '@mui/icons-material';
import { IconBuilding } from '@tabler/icons';
import { Translation } from 'constants/translations';
import { t } from 'i18next';
import { OverrideIcon } from 'types';

import NavbarTitle from './NavbarTitle';

interface ResultProps {
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

const Results: ResultProps = {
  id: 'Results',
  title: <NavbarTitle>{t(Translation.NAVIGATION_TAB_ITEM_RESULTS)}</NavbarTitle>,
  type: 'group',
  children: [
    {
      id: 'inHouseTests',
      title: t(Translation.PAGE_IN_HOUSE_TITLE),
      type: 'item',
      url: '/clinic-test-results/in-house-tests',
      icon: IconBuilding,
      breadcrumbs: false
    },
    {
      id: 'externalResults',
      title: t(Translation.PAGE_RESULTS_TITLE),
      type: 'item',
      url: '/clinic-test-results/external-results',
      icon: KeyboardDoubleArrowLeftOutlined,
      breadcrumbs: false
    }
  ]
};

export default Results;
