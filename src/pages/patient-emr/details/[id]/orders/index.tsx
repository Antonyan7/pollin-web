import React from 'react';
import PatientOrdersList from '@components/PatientOrders/PatientOrdersList';
import PatientOrdersAndResultsLayout from 'layout/PatientOrdersAndResultsLayout';

const Orders = () => <PatientOrdersList />;

Orders.PageLayout = PatientOrdersAndResultsLayout;

export default Orders;
