import { Button } from "@mui/material";
import React from "react";

const AddReplyButton = ({ setReplyText, onAdd, replyText }) => {
  return (
    <Button
      size="small"
      variant="outlined"
      sx={{ textTransform: "none" }}
      onClick={(e) => {
        if (!replyText.trim()) {
          e.preventDefault();
        } else {
          onAdd(replyText);
          setReplyText("");
        }
      }}
    >
      Reply
    </Button>
  );
};

export default AddReplyButton;
