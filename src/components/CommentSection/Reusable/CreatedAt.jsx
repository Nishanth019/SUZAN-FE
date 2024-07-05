import { Typography } from "@mui/material";
import React from "react";
import { formatDistanceToNow } from "date-fns";

const CreatedAt = ({ createdAt }) => {
  const formatDate = (dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  return (
    <Typography sx={{ color: "neutral.grayishBlue" }} className="max-md:!hidden">
      {createdAt ? formatDate(createdAt) : ""}
    </Typography>
  );
};

export default CreatedAt;
