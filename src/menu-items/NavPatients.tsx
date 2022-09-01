import React from 'react';
import { IconCirclePlus } from '@tabler/icons';
import { OverrideIcon } from 'types';

interface PatientsProps {
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

const NavPatients: PatientsProps = {
  id: 'Patients',
  title: <h3>Patient EMR</h3>,
  type: 'group',
  children: [
    {
      id: 'Patient List/EMR',
      title: 'Patient List/EMR',
      type: 'item',
      url: '/patient-emr/list',
      icon: IconCirclePlus,
      breadcrumbs: false
    }
  ]
};

export default NavPatients;
