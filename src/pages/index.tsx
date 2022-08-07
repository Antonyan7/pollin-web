import React from 'react';
import MainLayout from 'layout/MainLayout';
import type { NextPage } from 'next';
import Calendar from 'ui-component/calendar';

const Home: NextPage = () => (
  <>
    <MainLayout />
    <Calendar />
  </>
);

export default Home;