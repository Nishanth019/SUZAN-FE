import { Button } from "@mui/material";
import React, { useContext } from "react";

const SendButton = ({ setCommentTxt, commentTxt }) => {

  return (
    <Button
      size="medium"
      variant="outlined"
      sx={{ textTransform: "none" }} // This line removes the capitalization
      onClick={(e) => {
        // !commentTxt.trim() ? e.preventDefault() : addComment(commentTxt.trim());
        setCommentTxt("");
      }}
    >
      Post Comment
    </Button>
  );
};

export default SendButton;
