'use client'
import React, { useContext, useState } from "react";
import { Avatar, Card, Stack, ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";
import ScoreChanger from "./ScoreChanger";
import theme from "./styles";
import RepliesSection from "./RepliesSection";
import ConfirmDelete from "./ConfirmDelete";
import Username from "./Reusable/Username";
import CreatedAt from "./Reusable/CreatedAt";
import CommentText from "./Reusable/Comment/CommentText";
import EditableCommentField from "./Reusable/Comment/EditableCommentField";
import EditButton from "./Reusable/Buttons/TextButtons/EditButton";
import DeleteButton from "./Reusable/Buttons/TextButtons/DeleteButton";
import ReplyButton from "./Reusable/Buttons/TextButtons/ReplyButton";
import UpdateButton from "./Reusable/Buttons/BgButtons/UpdateButton";

const Comment = ({ onPass }) => {
  const { id, content, createdAt, score, replies, user } = onPass;
  const userName = user.username;
//   const ava = IMGOBJ[`${userName}`];
  const [ava,setAva] = useState("");

  const [clicked, setClicked] = useState(false);
  const [editingComm, setEditingComm] = useState(false);
  const [commentText, setCommentText] = useState(content);
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <ConfirmDelete onOpen={openModal} onClose={handleClose} id={id} />
      <Card >
        <Box className="!p-[15px]">
          <div className="flex flex-col gap-2 items-start">
            <Box sx={{ width: "100%" }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <div className="flex items-center gap-2 ">
                  <Avatar src={ava}></Avatar>
                  <Username userName={userName} />
                  <CreatedAt createdAt={createdAt} className="max-md:!hidden" />
                </div>
                {userName === "juliusomo" ? (
                  <div className="flex gap-2">
                    <DeleteButton functionality={() => handleOpen()} />
                    <EditButton
                      functionality={() => setEditingComm(!editingComm)}
                      editingComm={editingComm}
                    />
                  </div>
                ) : (
                  <ReplyButton functionality={() => setClicked(!clicked)} />
                )}
              </Stack>
              {editingComm ? (
                <>
                  <EditableCommentField
                    commentText={commentText}
                    setCommentText={setCommentText}
                    placeHolder="Don't leave this blank!"
                  />
                  <UpdateButton
                    commentText={commentText}
                    editingComm={editingComm}
                    setEditingComm={setEditingComm}
                  />
                </>
              ) : (
                <CommentText commentText={commentText} />
              )}
            </Box>
            <Box>
              <ScoreChanger/>
            </Box>
          </div>
        </Box>
      </Card>
      {replies ? (
        <RepliesSection
          onReplies={replies}
          onClicked={clicked}
          onTar={userName}
        />
      ) : null}
    </ThemeProvider>
  );
};
export default Comment;