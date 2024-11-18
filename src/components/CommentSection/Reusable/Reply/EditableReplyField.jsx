import { TextField, useMediaQuery } from "@mui/material";
import React from "react";

const EditableReplyField = ({ text, setText, placeHolder }) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  return (
    <TextField
      sx={{ p: "10px 0" }}
      multiline
      fullWidth
      minRows={isSmallScreen ? 1 : 2}
      id="outlined-multilined"
      placeholder={placeHolder}
      value={text}
      onChange={(e) => {
        setText(e.target.value);
      }}
    />
  );
};

export default EditableReplyField;