import { TextField, useMediaQuery } from "@mui/material";
import React from "react";

const EditableCommentField = ({ commentText, setCommentText, placeHolder }) => {
  // Use Material-UI's useMediaQuery to detect small screens
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <TextField
      sx={{ p: "20px 0" }}
      multiline
      fullWidth
      minRows={isSmallScreen ? 1 : 2} // Adjust minRows based on screen size
      id="outlined-multilined"
      placeholder={placeHolder}
      value={commentText}
      onChange={(e) => {
        setCommentText(e.target.value);
      }}
    />
  );
};

export default EditableCommentField;
