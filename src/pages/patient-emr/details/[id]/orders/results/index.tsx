import React from 'react';
import OrderResults from '@components/OrderResults/OrderResults';
import PatientEmrLayout from 'pages/patient-emr/details/[id]/index';

const Results = () => <OrderResults />;

Results.PageLayout = PatientEmrLayout;

export default Results;
