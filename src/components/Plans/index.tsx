import React, { useState } from 'react';

import CreatePlan from './components/createPlan';
import PatientPlansList from './components/list';
import { PlanPage } from './types';

const PlansPageGeneralLayout = () => {
  const [pageData, setPageData] = useState({
    name: PlanPage.List,
    planTypeId: ''
  });

  const changePage = (pageName: PlanPage, planTypeId?: string) => {
    setPageData({
      name: pageName,
      planTypeId: planTypeId ?? ''
    });
  };

  if (pageData.name === PlanPage.List) {
    return <PatientPlansList changePage={changePage} />;
  }

  if (pageData.name === PlanPage.Create) {
    return <CreatePlan changePage={changePage} planTypeId={pageData.planTypeId} />;
  }

  return null;
};

export default PlansPageGeneralLayout;
