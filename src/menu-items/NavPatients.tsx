import React from 'react';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
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
      id: 'Patient List',
      title: 'Patient List',
      type: 'item',
      url: '/patient-emr/list',
      icon: GroupsTwoToneIcon,
      breadcrumbs: false
    }
  ]
};

export default NavPatients;
