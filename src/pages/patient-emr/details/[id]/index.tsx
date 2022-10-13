import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PatientDetailsComponent from 'components/Patients/PatientDetails';
import { useRouter } from 'next/router';
import { dispatch } from 'redux/hooks';
import { patientsMiddleware, patientsSelector } from 'redux/slices/patients';

// TODO : add logic here with PCP-277
const PatientDetails = () => {
  const router = useRouter();
  const patientId = useSelector(patientsSelector.currentPatientId);
  const patientProfile = useSelector(patientsSelector.patientProfile);

  useEffect(() => {
    if (router.query.id && typeof router.query.id === 'string') {
      dispatch(patientsMiddleware.setCurrentPatient(router.query.id));
      dispatch(patientsMiddleware.getPatientProfile(router.query.id));
    }
  }, [router.query.id]);

  return <PatientDetailsComponent id={patientId} patientName={patientProfile?.title} />;
};

export default PatientDetails;
