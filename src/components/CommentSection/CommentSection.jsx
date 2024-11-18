'use client';
import React, { useState, useEffect } from 'react';
import { Container, Stack,useMediaQuery } from '@mui/material';
import Comment from './Comment';
import AddComment from './AddComment';
import { usePathname } from 'next/navigation';
import commentService from '../../services/comment.service.js';

const CommentSection = ({ type }) => {
  const pathname = usePathname();
  const course_id = pathname.split('/').pop();
  const [commentSection, setCommentSection] = useState([]);
  const [commentsUpdated, setCommentsUpdated] = useState(false);

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await commentService.getAllComments(course_id);
        const sortedComments = response.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        setCommentSection(sortedComments);
        console.log(123999, sortedComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [course_id, commentsUpdated]);

  const handleCommentAdded = () => {
    setCommentsUpdated(prev => !prev); // Toggle the state
  };

  const handleRepliesUpdated = () => {
    setCommentsUpdated(prev => !prev); // Toggle the state
  };


  return (
    <div className="w-full p-2 md:py-5 sm:px-5 lg:px-10 xl:px-16">
      <div className="text-black mb-6">
        <p className="text-2xl sm:text-4xl font-bold">Discussion</p>
      </div>
      <Container maxWidth="md">
        <Stack spacing={isSmallScreen ? 1 : 2}>
          <AddComment target={course_id} targetType="course" onCommentAdded={handleCommentAdded} />
          {commentSection.map((comment) => {
            return <Comment key={comment.id} onPass={comment} onRepliesUpdated={handleRepliesUpdated} />;
          })}
        </Stack>
      </Container>
    </div>
  );
};

export default CommentSection;
