import React from 'react';

const TimePeriodsRow: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="create-template-box">
    <p>{title}</p>
    {children}
  </div>
);

export default TimePeriodsRow;
