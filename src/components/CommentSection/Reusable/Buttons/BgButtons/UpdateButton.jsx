import { Button } from "@mui/material";
import React from "react";

const UpdateButton = ({ commentText, editingComm, setEditingComm }) => {
  return (
    <Button
    size="large"
    variant="outlined"
    sx={{ textTransform: "none", float:"right"
   }}
      onClick={() => {
        !commentText.trim()
          ? alert(
              "If  you want to remove the comment text, just delete the comment."
            )
          : setEditingComm(!editingComm);
      }}
    >
      Update
    </Button>
  );
};

export default UpdateButton;