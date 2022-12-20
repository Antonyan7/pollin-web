import React from 'react';

import MeasurementListForm from './MeasurementList/MeasurementListForm';
import { InputResultsProps } from './types';

const InputResults: React.FC<InputResultsProps> = ({ testType }) => <MeasurementListForm testType={testType} />;

export default InputResults;
