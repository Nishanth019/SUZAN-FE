'use client'
import { Avatar, Card, Stack, ThemeProvider } from "@mui/material";
import { div } from "@mui/system";
import React, { useContext, useState } from "react";
import theme from "./styles";
import EditableCommentField from "./Reusable/Comment/EditableCommentField";
import SendButton from "./Reusable/Buttons/BgButtons/SendButton";
import avatar from "@/assets/Comment/avatar.png"

const AddComment = () => {
  // const { IMGOBJ } = useContext(CommentContext);
  const [commentTxt, setCommentTxt] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <Card>
        <div className="p-[10px] md:p-[15px]">
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Avatar
            className="max-md:hidden"
              src={avatar}
              variant="rounded"
              alt="user-avatar"
            />
            <div className="w-full">
            <EditableCommentField
              commentText={commentTxt}
              setCommentText={setCommentTxt}
              placeHolder="Add a comment"
            />
            <SendButton commentTxt={commentTxt} setCommentTxt={setCommentTxt} />
            </div>
          </Stack>
        </div>
      </Card>
    </ThemeProvider>
  );
};

export default AddComment;