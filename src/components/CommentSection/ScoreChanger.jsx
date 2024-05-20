import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

const Likes = ({ initialCount }) => {
  // const [count, setCount] = useState(initialCount);
  const [count, setCount] = useState(10);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setCount(count - 1);
    } else {
      setCount(count + 1);
    }
    setLiked(!liked);
  };

  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
  }}
    >
      <IconButton
        disableRipple
        aria-label="like"
        onClick={handleLike}
      >
        {liked ? (
          <ThumbUpIcon className="text-[18px]" sx={{ color: "#3f51b5" }} />
        ) : (
          <ThumbUpOutlinedIcon className="text-[18px]"/>
        )}
      </IconButton>
      <Typography sx={{ color: liked ? "#3f51b5" : "inherit", fontWeight: 500 }}>
        {count}
      </Typography>
    </Box>
  );
};

export default Likes;
