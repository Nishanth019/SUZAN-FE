import { Button } from "@mui/material";
import React from "react";

const AddReplyButton = ({ setReplyText, onAdd, replyText }) => {
  return (
    <Button
    size="large"
    variant="outlined"
    sx={{ textTransform: "none" }}
      onClick={(e) => {
        !replyText.trim() ? e.preventDefault() : onAdd(replyText);
        setReplyText("");
      }}
    >
      Reply
    </Button>
  );
};

export default AddReplyButton;