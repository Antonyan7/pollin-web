import React, { useState } from 'react';
import { IMedications, MedicationCardType, PrescriptionsProps } from '@axios/patientEmr/managerPatientEmrTypes';
import PrescriptionCardTitle from '@components/Medications/layout/Prescriptions/PrescriptionsListItem/PrescriptionCardTitle';
import ViewModeContent from '@components/Medications/layout/Prescriptions/PrescriptionsListItem/PrescriptionListItem';
import PlanMedicationCardTitle from '@components/PlanDetails/components/PlanMedications/PlanMedicationCardTitle';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Badge, cardHeaderClasses, Grid, IconButton, Typography, useTheme } from '@mui/material';
import { borders, margins, paddings } from 'themes/themeConstants';

import SubCardStyled from '@ui-component/cards/SubCardStyled';

interface IMedicationCardProps {
  data: IMedications;
  cardType: MedicationCardType;
}

const MedicationCard = ({ data, cardType }: IMedicationCardProps) => {
  const theme = useTheme();
  const [showCard, setShowCard] = useState([false]);

  const handleArrowClick = (index: number) => {
    setShowCard((prevState) => {
      const newState = [...prevState];

      newState[index] = !newState[index];

      return newState;
    });
  };

  return (
    <SubCardStyled
      sx={{
        m: margins.all8,
        outline: `${borders.solid1px} ${theme.palette.primary.light}`,
        '& > .MuiDivider-root': {
          borderColor: theme.palette.primary.light
        },
        [`.${cardHeaderClasses.root}`]: {
          py: paddings.topBottom16,
          pr: paddings.leftRight0,
          pl: 0
        }
      }}
      title={
        <Grid>
          {cardType === MedicationCardType.Plan ? (
            <PlanMedicationCardTitle categoryId={data.categoryId} exists={data.exists} />
          ) : (
            <PrescriptionCardTitle prescription={data as PrescriptionsProps} />
          )}
          {MedicationCardType.Prescription || data.exists ? (
            <Grid>
              <Grid>
                {data?.medications?.map((medication, index: number) => (
                  <Grid
                    container
                    spacing={1}
                    sx={{
                      fontWeight: 400,
                      backgroundColor: theme.palette.secondary[200],
                      fontSize: theme.typography.pxToRem(16),
                      m: margins.all4,
                      ml: 0
                    }}
                    alignItems="center"
                  >
                    <Grid item xs={11.2}>
                      <Typography variant="h5" sx={{ ml: margins.left24 }}>
                        {medication.title}
                        {medication?.commonName ? (
                          <>
                            <Badge
                              color="secondary"
                              overlap="circular"
                              variant="dot"
                              sx={{
                                margin: margins.all12,
                                '& .MuiBadge-dot': {
                                  height: 5,
                                  minWidth: 5
                                }
                              }}
                            />
                            {medication?.commonName}
                          </>
                        ) : null}
                      </Typography>
                    </Grid>
                    <Grid item xs={0.5}>
                      <IconButton onClick={() => handleArrowClick(index)}>
                        {showCard[index] ? (
                          <KeyboardArrowUp
                            sx={{
                              color: theme.palette.primary.main,
                              fontSize: theme.typography.pxToRem(24)
                            }}
                          />
                        ) : (
                          <KeyboardArrowDown
                            sx={{
                              color: theme.palette.primary.main,
                              fontSize: theme.typography.pxToRem(24)
                            }}
                          />
                        )}
                      </IconButton>
                    </Grid>
                    <Grid hidden={!showCard[index]} sx={{ marginTop: margins.top10 }}>
                      <ViewModeContent
                        medicationData={medication}
                        prescriber={cardType === MedicationCardType.Prescription ? data.prescriber : null}
                      />
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      }
    />
  );
};

export default MedicationCard;
