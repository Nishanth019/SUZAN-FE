import { Button } from "@mui/material";
import React from "react";

const UpdateButton = ({ commentText, handleUpdate }) => {
  return (
    <Button
      size="medium"
      variant="outlined"
      sx={{ textTransform: "none", float: "right" }}
      onClick={() => {
        if (!commentText.trim()) {
          alert("If you want to remove the comment text, just delete the comment.");
        } else {
          handleUpdate();
        }
      }}
    >
      Update
    </Button>
  );
};

export default UpdateButton;
