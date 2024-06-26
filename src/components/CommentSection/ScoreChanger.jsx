import { Box, IconButton, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { useGlobalContext } from "@/context/AuthContext";
import commentService from "@/services/comment.service";

const Likes = ({ commentId, ReplyComment }) => {
  const { user } = useGlobalContext();
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const fetchLikes = async () => {
    try {
      let data;
      if (ReplyComment) {
        data = await commentService.getReplyCommentLikes(commentId);
      } else {
        data = await commentService.getCommentLikes(commentId);
      }
      const likesArray = data?.data?.likes || [];

      setCount(likesArray.length);
      setLiked(likesArray.some(like => like._id === user._id));
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      fetchLikes();
    }
  }, [commentId, user]);

  const handleLike = async () => {
    try {
      if (ReplyComment) {
        await commentService.likeReplyComment(commentId, user._id);
      } else {
        await commentService.likeComment(commentId, user._id);
      }
      fetchLikes();
    } catch (error) {
      console.error('Error liking/unliking comment:', error);
    }
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
      <IconButton disableRipple aria-label="like" onClick={handleLike}>
        {liked ? (
          <ThumbUpIcon className="text-[18px]" sx={{ color: "#3f51b5" }} />
        ) : (
          <ThumbUpOutlinedIcon className="text-[18px]" />
        )}
      </IconButton>
      <Typography sx={{ color: liked ? "#3f51b5" : "inherit", fontWeight: 500 }}>
        {count}
      </Typography>
    </Box>
  );
};

export default Likes;
