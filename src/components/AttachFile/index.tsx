import React, { ChangeEvent, FC, useCallback, useRef } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { MAXIMUM_ALLOWED_ATTACHED_FILES_COUNT } from '@constants';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Grid, Input, Typography } from '@mui/material';
import { Translation } from 'constants/translations';
import { borderRadius, paddings } from 'themes/themeConstants';
import { ITestResultAttachment } from 'types/reduxTypes/resultsStateTypes';

import { ButtonWithIcon } from '@ui-component/common/buttons';

import AttachedFilesDetails from './AttachedFilesDetails';

interface AttachedFileProps {
  currentFormFieldName: string;
}

const AttachFile: FC<AttachedFileProps> = ({ currentFormFieldName }) => {
  const [t] = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { control } = useFormContext();

  const currentFormFieldAttachments = `${currentFormFieldName}.attachments`;

  const { fields, append, remove } = useFieldArray({
    control,
    name: currentFormFieldAttachments
  });

  const attachments = useWatch({
    name: currentFormFieldAttachments,
    control
  });

  const isFileAttachmentLimitReachedOut = attachments && attachments.length >= MAXIMUM_ALLOWED_ATTACHED_FILES_COUNT;

  const handleFileAttachment = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e?.target?.files ?? [];
    const newAttachedFiles = Object.values(files).map((item) => ({
      file: item,
      title: item.name,
      note: ''
    }));

    append(newAttachedFiles);
    // ? Clear input value after file attachment [PCP-1999].
    e.target.value = '';
  };

  const handleRemoveAttachedFile = useCallback(
    (removingAttachedFileIndex: number) => {
      remove(removingAttachedFileIndex);
    },
    [remove]
  );

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
          border: 0,
          // When user reached out file attachment limit [25]
          ...(isFileAttachmentLimitReachedOut && {
            pointerEvents: 'none',
            opacity: '.5'
          })
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
          accept: '.pdf, .doc, .docx'
        }}
        inputRef={fileInputRef}
        type="file"
        sx={{ display: 'none' }}
      />
      {isFileAttachmentLimitReachedOut && (
        <Typography sx={{ py: paddings.topBottom16, color: (theme) => theme.palette.error.dark }}>{`${t(
          Translation.FILE_ATTACHMENT_MAXIMUM_LIMIT_REACHED_OUT
        )} [${MAXIMUM_ALLOWED_ATTACHED_FILES_COUNT}]`}</Typography>
      )}
      {attachments?.length > 0 && (
        <AttachedFilesDetails
          fields={fields as ITestResultAttachment[]}
          currentFormFieldAttachments={currentFormFieldAttachments}
          handleAttachedFileRemove={handleRemoveAttachedFile}
        />
      )}
    </Grid>
  );
};

export default AttachFile;
