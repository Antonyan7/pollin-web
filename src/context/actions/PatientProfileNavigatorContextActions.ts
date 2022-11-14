import React, { ElementType } from 'react';

import AppointmentsList from '@ui-component/profile/AppointmentsList';

import { PatientProfileNavigatorContextActionTypes } from '../types/PatientProfileNavigatorContextTypes';

// eslint-disable-next-line @typescript-eslint/ban-types
type ComponentPropObject<T extends ElementType> = React.ComponentPropsWithoutRef<T> extends unknown
  ? Record<string, never>
  : React.ComponentPropsWithoutRef<T>;

export interface IAppointmentListPageAction {
  type: typeof PatientProfileNavigatorContextActionTypes.APPOINTMENTS_LIST_PAGE;
  props: ComponentPropObject<typeof AppointmentsList>;
}

export interface INonePageAction {
  type: typeof PatientProfileNavigatorContextActionTypes.NONE;
}

export type PatientProfileNavigatorAction = IAppointmentListPageAction | INonePageAction;
