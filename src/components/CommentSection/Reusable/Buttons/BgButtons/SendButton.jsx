// SendButton.jsx
import { Button } from "@mui/material";
import React from "react";

const SendButton = ({ onClick }) => {
  return (
    <Button
      size="medium"
      variant="outlined"
      sx={{ textTransform: "none" }} // This line removes the capitalization
      onClick={onClick}
    >
      Post Comment
    </Button>
  );
};

export default SendButton;
