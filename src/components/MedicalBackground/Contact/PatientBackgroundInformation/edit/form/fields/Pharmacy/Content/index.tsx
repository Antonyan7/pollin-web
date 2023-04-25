import React from 'react';
import StreetAddress from '@components/MedicalBackground/Contact/PatientBackgroundInformation/edit/form/fields/Pharmacy/Content/fields/StreetAddress';
import AddAddressManually from '@components/MedicalBackground/Contact/PatientContactInformation/edit/form/actions/AddAddressManually';
import { ManuallyAddressModalMode } from '@components/Modals/MedicalBackground/AddAddressManually/helpers';
import { Grid } from '@mui/material';
import { paddings } from 'themes/themeConstants';

import PharmacyCountry from './fields/Country';
import PharmacyFaxNumber from './fields/FaxNumber';
import PharmacyName from './fields/PharmacyName';
import PharmacyPhoneNumber from './fields/PhoneNumber';
import PharmacyUnitNumber from './fields/UnitNumber';

const PharmacyContent = () => (
  <Grid item container direction="row" spacing={2} p={paddings.all16}>
    <PharmacyName />
    <StreetAddress />
    <PharmacyUnitNumber />
    <PharmacyCountry />
    <AddAddressManually actionType={ManuallyAddressModalMode.Pharmacy} />
    <PharmacyPhoneNumber />
    <PharmacyFaxNumber />
  </Grid>
);

export default PharmacyContent;
