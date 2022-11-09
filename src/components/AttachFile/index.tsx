import React, { ChangeEvent, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MAXIMUM_ALLOWED_ATTACHED_FILES_COUNT } from '@constants';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Grid, Input } from '@mui/material';
import { Translation } from 'constants/translations';
import { borderRadius, paddings } from 'themes/themeConstants';

import { ButtonWithIcon } from '@ui-component/common/buttons';

import AttachedFilesDetails from './AttachedFilesDetails';

const AttachFile = () => {
  const [t] = useTranslation();
  const fileInputRef = useRef<HTMLElement>(null);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  const handleFileAttachment = (e: ChangeEvent<HTMLInputElement>) => {
    const newAttachedFiles = Object.values(e?.target?.files ?? []);
    const allAttachedFiles = [...attachedFiles, ...newAttachedFiles];
    const allAttachedFilesCount = allAttachedFiles.length;
    const isValidFilesCount = allAttachedFilesCount > 0 && allAttachedFilesCount < MAXIMUM_ALLOWED_ATTACHED_FILES_COUNT;

    if (isValidFilesCount) {
      setAttachedFiles(allAttachedFiles);
    }
  };

  const handleRemoveAttachedFile = (removingAttachedFileName: string) => {
    const filteredAttachedFiles = attachedFiles.filter(
      (attachedFile) => attachedFile.name !== removingAttachedFileName
    );

    setAttachedFiles(filteredAttachedFiles);
  };

  return (
    <Grid sx={{ width: '100%' }}>
      <ButtonWithIcon
        color="primary"
        variant="contained"
        label={t(Translation.PAGE_INPUT_RESULTS_TEST_ATTACH_FILE)}
        sx={{
          py: paddings.topBottom8,
          px: paddings.leftRight24,
          borderRadius: borderRadius.radius4,
          border: 0
        }}
        labelSx={{
          fontWeight: 600
        }}
        onClick={() => fileInputRef?.current?.click()}
        icon={
          <AttachFileIcon
            fontSize="small"
            sx={{
              transform: 'rotate(90deg)'
            }}
          />
        }
      />

      <Input
        onChange={handleFileAttachment}
        inputProps={{
          multiple: true,
          hidden: true,
          accept: '.pdf'
        }}
        inputRef={fileInputRef}
        type="file"
        sx={{ display: 'none' }}
      />
      {attachedFiles?.length > 0 && (
        <AttachedFilesDetails attachedFiles={attachedFiles} handleAttachedFileRemove={handleRemoveAttachedFile} />
      )}
    </Grid>
  );
};

export default AttachFile;
