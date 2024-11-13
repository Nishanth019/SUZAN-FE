'use client';
import { Avatar, Card, Stack, ThemeProvider } from '@mui/material';
import React, { useState } from 'react';
import theme from './styles';
import EditableCommentField from './Reusable/Comment/EditableCommentField';
import SendButton from './Reusable/Buttons/BgButtons/SendButton';
import avatar from '@/assets/Comment/avatar.png';
import commentService from '../../services/comment.service';
import { useGlobalContext } from '@/context/AuthContext';

const AddComment = ({ targetType, target, onCommentAdded }) => {
  const [commentTxt, setCommentTxt] = useState("");
  const { user: currentUser } = useGlobalContext(); // Fetch current user's details

  const handleSendComment = async () => {
    try {
      if (commentTxt.trim()) {
        const response = await commentService.createMainComment({ content: commentTxt, target, targetType });
        console.log('Comment created:', response.data);
        setCommentTxt("");
        onCommentAdded(); // Call the callback function
      }
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Card>
        <div className="p-[10px] md:p-[15px]">
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Avatar
              className="max-md:!hidden"
              src={currentUser?.picture || avatar} // Use user's picture if available, otherwise fallback to default avatar
              variant="rounded"
              alt="user-avatar"
            />
            <div className="w-full">
              <EditableCommentField
                commentText={commentTxt}
                setCommentText={setCommentTxt}
                placeHolder="Add a comment"
              />
              <SendButton onClick={handleSendComment} />
            </div>
          </Stack>
        </div>
      </Card>
    </ThemeProvider>
  );
};

export default AddComment;
