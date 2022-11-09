import React from 'react';
import { useTranslation } from 'react-i18next';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Box, IconButton, Stack, TextField, Typography, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';
import { borderRadius, margins, paddings } from 'themes/themeConstants';

interface IAttachedFilesDetailsProps {
  attachedFiles: File[];
  handleAttachedFileRemove: (attachedFileName: string) => void;
}

const AttachedFilesDetails: React.FC<IAttachedFilesDetailsProps> = ({ attachedFiles, handleAttachedFileRemove }) => {
  const [t] = useTranslation();
  const theme = useTheme();

  return (
    <Stack my={margins.top24} sx={{ width: '100%' }} spacing={3}>
      {attachedFiles.map((attachedFile: File) => (
        <Box key={attachedFile.name} display="flex" alignItems="center" gap={4}>
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
                fontWeight={600}
              >
                {attachedFile.name}
              </Typography>
            </Box>
            <Box>
              <IconButton color="primary" disableRipple onClick={() => handleAttachedFileRemove(attachedFile.name)}>
                <HighlightOffIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ width: '100%' }}>
            <TextField
              label={t(Translation.PAGE_INPUT_RESULTS_TEST_ATTACH_FILE_NOTES_FORM_LAB)}
              sx={{ background: theme.palette.secondary.light, borderRadius: borderRadius.radius12, width: '100%' }}
              inputProps={{ sx: { pt: paddings.top12, color: theme.palette.secondary[800] } }}
            />
          </Box>
        </Box>
      ))}
    </Stack>
  );
};

export default AttachedFilesDetails;
