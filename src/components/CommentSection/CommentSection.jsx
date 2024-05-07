'use client'
import React, { useState } from 'react'
import { Container, Stack } from "@mui/material";
import Comment from "./Comment";
import AddComment from "./AddComment";

const CommentSection = () => {
  const [commentSection, setCommentSection] = useState([
    {
      id: 1,
      content: "This is the first comment!",
      createdAt: "2024-04-30T10:00:00Z",
      score: 5,
      replies: [
        {
          id: 101,
          content: "Reply to the first comment!",
          createdAt: "2024-04-30T10:05:00Z",
          score: 3,
          user: { username: "user1" },
          replyingTo: "juliusomo",
          replies: []
        },
        {
          id: 102,
          content: "Another reply to the first comment!",
          createdAt: "2024-04-30T10:10:00Z",
          score: 2,
          user: { username: "user2" },
          replyingTo: "juliusomo",
          replies: []
        }
      ],
      user: { username: "juliusomo" }
    },
    {
      id: 2,
      content: "Second comment here!",
      createdAt: "2024-04-30T11:00:00Z",
      score: 7,
      replies: [],
      user: { username: "user3" }
    },
    {
      id: 3,
      content: "Yet another comment!",
      createdAt: "2024-04-30T12:00:00Z",
      score: 2,
      replies: [],
      user: { username: "user4" }
    }
  ]);
  
  return (
    <div className="w-full p-2 md:py-5  sm:px-5 lg:px-10 xl:px-16">
    <div class="text-black mb-6">
    <p className="text-2xl sm:text-4xl font-bold">Discussion (20)</p>
    </div>
    <Container maxWidth="md">
      <Stack spacing={3}>
        <AddComment />
        {commentSection.map((comment) => {
          return <Comment key={comment.id} onPass={comment} />;
        })}
      </Stack>
    </Container>
    </div>
  )
}

export default CommentSection
