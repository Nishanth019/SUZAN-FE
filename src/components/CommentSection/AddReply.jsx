'use client'
import { Avatar, Card, Stack, ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import theme from "./styles";
import AddReplyButton from "./Reusable/Buttons/BgButtons/AddReplyButton";
import EditableReplyField from "./Reusable/Reply/EditableReplyField";
import avatar from "@/assets/Comment/avatar.png"

const AddReply = ({ onAdd }) => {
  // const { IMGOBJ } = useContext(CommentContext);
  const [replyText, setReplyText] = useState("");
  return (
    <ThemeProvider theme={theme}>
      <Card>
      <div className="p-[10px] md:p-[15px]">
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Avatar
            className="max-md:!hidden"
              src={avatar}
              variant="rounded"
              alt="user-avatar"
            />
              <div className="w-full">
            <EditableReplyField
              placeHolder="Add a reply"
              setText={setReplyText}
              text={replyText}
            />
            <AddReplyButton
              onAdd={onAdd}
              replyText={replyText}
              setReplyText={setReplyText}
            />
            </div>
          </Stack>
        </div>
      </Card>
    </ThemeProvider>
  );
};

export default AddReply;