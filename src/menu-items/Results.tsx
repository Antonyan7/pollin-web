import React from 'react';
import { KeyboardDoubleArrowLeftOutlined } from '@mui/icons-material';
import { IconBuilding } from '@tabler/icons';
import { OverrideIcon } from 'types';

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
  title: <h3>Results</h3>,
  type: 'group',
  children: [
    {
      id: 'inHouseResults',
      title: 'In-House Results',
      type: 'item',
      url: '/clinic-test-results/test-results',
      icon: IconBuilding,
      breadcrumbs: false
    },
    {
      id: 'externalResults',
      title: 'External Results',
      type: 'item',
      url: '/clinic-test-results/external-results',
      icon: KeyboardDoubleArrowLeftOutlined,
      breadcrumbs: false
    }
  ]
};

export default Results;
