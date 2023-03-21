import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Box, IconButton, Stack, TextField, Typography, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';
import { borderRadius, margins, paddings } from 'themes/themeConstants';
import { ITestResultAttachment } from 'types/reduxTypes/resultsStateTypes';

interface IAttachedFilesDetailsProps {
  fields: ITestResultAttachment[];
  handleAttachedFileRemove: (index: number) => void;
  currentFormFieldAttachments: string;
}

const AttachedFilesDetails: React.FC<IAttachedFilesDetailsProps> = ({
  fields,
  handleAttachedFileRemove,
  currentFormFieldAttachments
}) => {
  const [t] = useTranslation();
  const theme = useTheme();
  const { register } = useFormContext();

  return (
    <Stack my={margins.top24} sx={{ width: '100%' }} spacing={3}>
      {fields?.map((field, index) => (
        <Box key={field.id} display="flex" alignItems="center" gap={4}>
          <Box
            display="flex"
            sx={{
              width: '213px',
              borderRadius: borderRadius.radius12,
              background: theme.palette.primary[100]
            }}
            alignItems="center"
            justifyContent="center"
            px={paddings.leftRight8}
            py={margins.topBottom4}
          >
            <Box>
              <Typography
                sx={{
                  color: theme.palette.primary.dark,
                  width: '160px',
                  ml: margins.left12,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
                fontWeight={400}
              >
                {field.title}
              </Typography>
            </Box>
            <Box>
              <IconButton color="primary" disableRipple onClick={() => handleAttachedFileRemove(index)}>
                <HighlightOffIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ width: '100%' }}>
            <TextField
              label={t(Translation.PAGE_INPUT_RESULTS_TEST_ATTACH_FILE_NOTES_FORM_LAB)}
              sx={{ background: theme.palette.secondary.light, borderRadius: borderRadius.radius12, width: '100%' }}
              inputProps={{
                sx: {
                  color: theme.palette.secondary[800]
                }
              }}
              {...register(`${currentFormFieldAttachments}.${index}.note`)}
            />
          </Box>
        </Box>
      ))}
    </Stack>
  );
};

export default AttachedFilesDetails;
