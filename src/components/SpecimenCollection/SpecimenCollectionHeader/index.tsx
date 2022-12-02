import React from 'react';
import ResourceDropdown from '@components/SpecimenCollection/SpecimenCollectionHeader/ResourceDropdown';
import SpecimenCollectionDatePicker from '@components/SpecimenCollection/SpecimenCollectionHeader/SpecimenCollectionDatePicker';
import SpecimenCollectionFilter from '@components/SpecimenCollection/SpecimenCollectionHeader/SpecimenCollectionFilter';
import { Stack } from '@mui/material';

const SpecimenCollectionHeader = () => (
  <Stack direction="row" justifyContent="space-between" flexWrap="wrap" rowGap={1}>
    <ResourceDropdown />
    <SpecimenCollectionDatePicker />
    <SpecimenCollectionFilter />
  </Stack>
);

export default SpecimenCollectionHeader;
