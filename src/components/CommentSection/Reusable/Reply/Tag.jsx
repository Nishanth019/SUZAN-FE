import { Typography } from "@mui/material";
import React from "react";

const Tag = ({ onTar }) => {
  return (
    <Typography
      sx={{
        color: "custom.moderateBlue",
        width: "fit-content",
        display: "inline-block",
        fontWeight: 500,
      }}
      className="!text-[17px] md:!text-lg"
    >
      {`@${onTar}`}
    </Typography>
  );
};

export default Tag;