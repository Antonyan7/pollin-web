import React from 'react';
import { PeopleAltOutlined } from '@mui/icons-material';
import { CypressIds } from 'constants/cypressIds';
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
    dataCy?: string;
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
      dataCy: CypressIds.NAVIGATION_TAB_PATIENT_LIST,
      icon: PeopleAltOutlined,
      breadcrumbs: false
    }
  ]
};

export default NavPatients;
