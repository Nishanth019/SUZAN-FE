'use client'
import { Box, Card, Stack, Typography, Avatar, Button } from "@mui/material";
import React, { useContext, useState } from "react";
import ScoreChanger from "./ScoreChanger";
import { RiReplyFill } from 'react-icons/ri'; // Importing the reply icon from react-icons
import AddReply from "./AddReply";
import OwnReply from "./OwnReply";
import Username from "./Reusable/Username";
import CreatedAt from "./Reusable/CreatedAt";
import ReplyButton from "./Reusable/Buttons/TextButtons/ReplyButton";

const RepliesSection = ({ onReplies, onClicked, onTar }) => {
  // const { IMGOBJ } = useContext(CommentContext);
  const [repliess, setReplies] = useState(onReplies);
  const [replyingToId, setReplyingToId] = useState(null);

  const addReply = (data) => {
    setReplies([
      ...repliess,
      {
        id: Math.floor(Math.random() * 10000),
        content: data,
        createdAt: "Just now",
        score: 0,
        replyingTo: `${onTar}`,
        replies: [],
        user: { username: "juliusomo" },
      },
    ]);
    setReplyingToId(null); 
  };

  const addReplyToReply = (data) => {
    setReplies([
      ...repliess,
      {
        id: Math.floor(Math.random() * 10000),
        content: data,
        createdAt: "Just now",
        score: 0,
        replyingTo: `${onTar}`,
        replies: [],
        user: { username: "Nishanth" },
      },
    ]);
    setReplyingToId(null); 
  }

  const deleteReply = (id) => {
    setReplies(repliess.filter((reply) => reply.id !== id));
  };

  return (
    <Stack className="w-[90%]" spacing={2} alignSelf="flex-end">
      {onClicked ? <AddReply onAdd={addReply} /> : null}

      {repliess.map((rep) => {
        const { id, content, createdAt, score, user, replyingTo } = rep;
        const userName = user.username;
        // const ava = IMGOBJ[`${userName}`];
        const ava = "nishu"
        return userName === "juliusomo" ? (
          <OwnReply
            key={rep.id}
            comId={rep.id}
            onContent={content}
            onTime={createdAt}
            onCount={score}
            onTar={replyingTo}
            onDel={deleteReply}
          />
        ) : (
          <>
          <Card key={rep.id}>
            <Box sx={{ p: "15px" }}>
              <div className="flex flex-col gap-2 items-start">
                <Box sx={{ width: "100%" }}>
                  <Stack
                    spacing={2}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                <div className="flex items-center gap-2 ">
                  <Avatar src={ava}></Avatar>
                  <Username userName={userName} />
                  <CreatedAt createdAt={createdAt} className="max-md:hidden" />
                </div>
                <Button onClick={() =>{
                  if(id==replyingToId){
                    setReplyingToId(null)
                  }
                  else{
                  setReplyingToId(id)
                }}}> {/* Set replyingToId when Reply button is clicked */}
                <ReplyButton  />
                    </Button>
                  </Stack>
                  <Typography
                    component="div"
                    className="!text-[17px] md:!text-lg"
                    sx={{ color: "neutral.grayishBlue", p: "10px 0" }}
                  >
                    <Typography
                      sx={{
                        color: "custom.moderateBlue",
                        width: "fit-content",
                        display: "inline-block",
                        fontWeight: 500,
                      }}
                    >
                      {`@${replyingTo}`}
                    </Typography>{" "}
                    {content}
                  </Typography>
                </Box>
                <Box>
                  <ScoreChanger onScore={score} />
                </Box>
              </div>
            </Box>
          </Card>
          {replyingToId===id ? <AddReply onAdd={addReplyToReply } /> : null}
          </>
        );
      })}
    </Stack>
  );
};

export default RepliesSection;
