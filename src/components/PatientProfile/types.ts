import React from 'react';
import { IProfileData, IProfileTestResults, ITestResultHistory } from '@axios/patientEmr/managerPatientEmrTypes';
import { BoxProps, TypographyProps } from '@mui/material';
import { MUIStyledCommonProps, SxProps } from '@mui/system';
import { PatientProfileOverview } from 'types/reduxTypes/patient-emrStateTypes';

export interface WidgetProps {
  data?: PatientProfileOverview | ITestResultHistory | IProfileTestResults['patient'] | null;
  secondary?: React.ReactNode;
  sx?: SxProps;
  profile?: IProfileData;
  emptyWidgetTitle?: string;
  loading?: boolean;
}

export interface IListSubItem {
  title: string;
  id?: string;
}

export interface IListLayoutItem {
  title: string;
  subItems: IListSubItem[];
}

export interface ListLayoutProps {
  items: IListLayoutItem[];
  title?: string;
  renderAsList?: boolean;
  componentProps?: {
    list?: BoxProps;
    listWrapper?: BoxProps;
    title?: TypographyProps;
  };
}

export interface SecondaryLayoutProps {
  loading?: boolean;
}

export interface TestHistoryHintProps extends MUIStyledCommonProps {
  testResultId: string;
  children: React.ReactElement;
}
