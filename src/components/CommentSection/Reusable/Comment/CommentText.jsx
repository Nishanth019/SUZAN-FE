import { Typography } from "@mui/material";
import React from "react";

const CommentText = ({ commentText }) => {
  return (
    <Typography
      className="text-[17px] md:text-lg px-[10px] pt-[10px] md:px-[20px] md:pt-[20px] break-words"
      sx={{
        color: "neutral.grayishBlue",
        wordWrap: "break-word", 
        overflowWrap: "break-word", 
        whiteSpace: "normal", 
      }}
    >
      {commentText}
    </Typography>
  );
};

export default CommentText;
