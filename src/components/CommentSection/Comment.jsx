'use client';
import React, { useState, useEffect } from "react";
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
import UserService from "@/services/user.service";
import commentService from "@/services/comment.service";
import { useGlobalContext } from "@/context/AuthContext";

const Comment = ({ onPass, onRepliesUpdated }) => {
  const { user: currentUser } = useGlobalContext(); // Current authenticated user
  const { _id, content, updatedAt, likes, replies, user: commentUser } = onPass; // User who posted the comment

  const [userName, setUserName] = useState("");
  const [ava, setAva] = useState("");
  const [clicked, setClicked] = useState(false);
  const [editingComm, setEditingComm] = useState(false);
  const [commentText, setCommentText] = useState(content);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await UserService.getUserById(commentUser);
        setUserName(response.data.user.name);
        setAva(response.data.user.picture);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (commentUser) {
      fetchUser();
    }
  }, [commentUser]);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleUpdate = async () => {
    try {
      await commentService.updateComment(_id, { content: commentText });
      setEditingComm(false);
      onRepliesUpdated(); // Notify parent component to refresh comments
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await commentService.deleteComment(_id);
      onRepliesUpdated(); // Notify parent component to refresh comments
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ConfirmDelete onOpen={openModal} onClose={handleClose} onDelete={handleDelete} />
      <Card>
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
                  <CreatedAt createdAt={updatedAt} className="max-md:!hidden" />
                </div>
                {currentUser && commentUser === currentUser._id ? ( 
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
                    handleUpdate={handleUpdate}
                  />
                </>
              ) : (
                <CommentText commentText={commentText} />
              )}
            </Box>
            <Box>
              <ScoreChanger ReplyComment={false} initialLikes={likes} commentId={_id} />
            </Box>
          </div>
        </Box>
      </Card>
      {replies ? (
        <RepliesSection
          onReplies={replies}
          onClicked={clicked}
          onTar={_id}
          onRepliesUpdated={onRepliesUpdated}
        />
      ) : null}
    </ThemeProvider>
  );
};

export default Comment;
