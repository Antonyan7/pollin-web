import React, { useEffect } from 'react';
import PatientDetailsComponent from 'components/Patients/PatientDetails';
import { useRouter } from 'next/router';
import { dispatch } from 'redux/hooks';
import { patientsMiddleware } from 'redux/slices/patients';

// TODO : add logic here with PCP-277
const PatientDetails = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      dispatch(patientsMiddleware.setCurrentPatient(router.query.id as string));
    }
  }, [router.query.id]);

  return <PatientDetailsComponent />;
};

export default PatientDetails;
