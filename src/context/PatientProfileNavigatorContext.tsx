/* eslint-disable @typescript-eslint/ban-types */
import React, { useCallback, useContext, useEffect, useMemo, useReducer, useRef } from 'react';
import { useRouter } from 'next/router';

import { emptyFunction } from '@utils/contextUtils';
import { toQueryString } from '@utils/stringUtils';

import { patientProfileNavigatorReducer } from './reducers/PatientProfileNavigatorReducer';
import {
  IPatientProfileNavigatorState,
  PatientProfileNavigatorContextActionTypes,
  PatientProfilePageName
} from './types/PatientProfileNavigatorContextTypes';

const initialState: IPatientProfileNavigatorState = {
  page: null,
  name: null
};

interface IOverloadNavigateTo {
  (
    pageName: PatientProfilePageName.AppointmentsList,
    queryParams?: Record<string, string | string[] | undefined>
  ): void;
}

export interface IPatientProfileNavigatorContext {
  page: JSX.Element | null;
  profilePageName: PatientProfilePageName | null;
  navigateTo: IOverloadNavigateTo;
  navigateBack: () => void;
}

const VALID_PAGE_NAMES = [PatientProfilePageName.AppointmentsList];

const isValidPageSlug = (slug: string): slug is PatientProfilePageName => (VALID_PAGE_NAMES as string[]).includes(slug);

const PATH_NESTING_LEVEL = 5;

const PatientProfileNavigatorContext = React.createContext<IPatientProfileNavigatorContext>({
  page: null,
  profilePageName: null,
  navigateTo: emptyFunction,
  navigateBack: emptyFunction
});

export const PatientProfileNavigatorContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [profilePage, setProfilePage] = useReducer(patientProfileNavigatorReducer, initialState);
  const initialLoad = useRef(true);
  const router = useRouter();
  // profile page base path
  const basePath = useMemo(() => {
    const pathWithoutQueryParams = router.asPath.split('?').at(0) ?? '';

    return pathWithoutQueryParams.split('/').slice(0, PATH_NESTING_LEVEL).join('/');
  }, [router]);

  const navigateTo: IOverloadNavigateTo = useCallback(
    (pageName, queryParams) => {
      initialLoad.current = false;

      if (isValidPageSlug(pageName)) {
        const queryString = toQueryString(queryParams);

        router
          .push(`${basePath}/${pageName}${queryString}`, undefined, {
            shallow: true
          })
          .then(() => {
            if (pageName === PatientProfilePageName.AppointmentsList) {
              setProfilePage({ type: PatientProfileNavigatorContextActionTypes.APPOINTMENTS_LIST_PAGE, props: {} });
            }
          });
      }
    },
    [basePath, router]
  );

  const navigateBack = useCallback(() => {
    if (profilePage.name !== null) {
      initialLoad.current = false;
      router.push(basePath, undefined, { scroll: false }).then(() => {
        setProfilePage({ type: PatientProfileNavigatorContextActionTypes.NONE });
      });
    }
  }, [basePath, profilePage, router]);

  useEffect(() => {
    const pathWithoutQueryParams = router.asPath.split('?').at(0) ?? '';
    const slug = pathWithoutQueryParams.split('/').slice(PATH_NESTING_LEVEL).join('/').replace(/\/+$/i, '') ?? '';

    if (initialLoad.current && isValidPageSlug(slug)) {
      navigateTo(slug, router.query);
    } else if (slug === '') {
      navigateBack();
    }
  }, [router, navigateTo, navigateBack]);

  const value: IPatientProfileNavigatorContext = useMemo(
    () => ({
      page: profilePage.page,
      profilePageName: profilePage.name,
      navigateTo,
      navigateBack
    }),
    [navigateBack, navigateTo, profilePage]
  );

  return <PatientProfileNavigatorContext.Provider value={value}>{children}</PatientProfileNavigatorContext.Provider>;
};

export const usePatientProfileNavigatorContext = () => useContext(PatientProfileNavigatorContext);
