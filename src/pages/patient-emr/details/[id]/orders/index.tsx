import React from 'react';
import PatientOrdersList from '@components/PatientOrders/PatientOrdersList';
import PatientOdersAndResultsLayout from 'layout/PatientOdersAndResultsLayout';

const Orders = () => <PatientOrdersList />;

Orders.PageLayout = PatientOdersAndResultsLayout;

export default Orders;
