import { Typography } from "@mui/material";
import React from "react";

const CreatedAt = ({ createdAt }) => {
  return (
    <Typography sx={{ color: "neutral.grayishBlue" }}  className="max-md:!hidden">{createdAt}</Typography>
  );
};

export default CreatedAt;