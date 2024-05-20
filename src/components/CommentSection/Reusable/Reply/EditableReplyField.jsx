import { TextField } from "@mui/material";
import React from "react";

const EditableReplyField = ({ text, setText, placeHolder }) => {
  return (
    <TextField
      sx={{ p: "10px 0" }}
      multiline
      fullWidth
      minRows={2}
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