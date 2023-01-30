import React from 'react';
import PatientOrdersList from '@components/PatientOrders/PatientOrdersList';
import PatientEmrLayout from 'pages/patient-emr/details/[id]/index';

const Orders = () => <PatientOrdersList />;

Orders.PageLayout = PatientEmrLayout;

export default Orders;
