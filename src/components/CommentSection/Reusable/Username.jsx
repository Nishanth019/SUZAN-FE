import { Typography } from "@mui/material";
import React from "react";
import YouTag from "../YouTag";
import { useGlobalContext } from "@/context/AuthContext";

const Username = ({ userName, userId }) => {
  const { user: currentUser } = useGlobalContext();
  return (
    <>
      <Typography className="!text-sm sm:!text-lg" fontWeight="bold" sx={{ color: "neutral.darkBlue" }}>
        {userName}
      </Typography>
      {/* {userId === currentUser._id ? <div className="max-sm:!hidden"><YouTag /></div> : null} */}
    </>
  );
};

export default Username;