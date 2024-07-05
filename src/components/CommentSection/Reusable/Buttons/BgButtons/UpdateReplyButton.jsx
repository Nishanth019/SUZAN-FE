import { Button } from "@mui/material";
import React from "react";

const UpdateReplyButton = ({
  repText,
  setClicked,
  setEditingRep,
  editingRep,
  clicked,
}) => {
  return (
    <Button
    size="medium"
    variant="outlined"
    sx={{ textTransform: "none", float:"right"}}
      onClick={() => {
        !repText.trim()
          ? alert("Read the placeholder.")
          : setEditingRep(!editingRep);
        setClicked(!clicked);
      }}
    >
      Update
    </Button>
  );
};

export default UpdateReplyButton;