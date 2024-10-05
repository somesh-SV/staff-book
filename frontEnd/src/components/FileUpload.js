import React, { useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { CloudArrowDownIcon } from "@heroicons/react/24/solid";
const FileUpload = ({ onFileUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      onFileUpload(acceptedFiles);
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        height: "100px",
        border: "2px dashed #818CF8",
        borderRadius: "5px",
        p: 2,
        textAlign: "center",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box display="flex" alignItems="center" justifyItems="center" gap={1}>
        <CloudArrowDownIcon className="w-7 h-7 text-indigo-400" />
        <input {...getInputProps()} aria-label="File upload input" />
        {isDragActive ? (
          <Typography
            style={{
              marginTop: "3px",
              color: "#818CF8",
              fontSize: "13px",
              fontWeight: "bold",
            }}
          >
            Drop the files here ...
          </Typography>
        ) : (
          <Typography
            sx={{
              fontSize: "13px",
              color: "#818CF8",
              fontWeight: "bold",
              marginTop: 0.3,
            }}
          >
            Drag & Drop or click to upload files
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default FileUpload;
