import React from 'react';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import { Translation } from 'constants/translations';
import { t } from 'i18next';
import { OverrideIcon } from 'types';

import NavbarTitle from './NavbarTitle';

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
  title: <NavbarTitle>{t(Translation.NAVIGATION_TAB_ITEM_PATIENT_EMR)}</NavbarTitle>,
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
