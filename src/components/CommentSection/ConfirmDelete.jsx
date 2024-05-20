import React, { useContext } from "react";
import {
  Button,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

const ConfirmDelete = ({ onOpen, onClose, id, onDel, comId }) => {
//   const { deleteComment } = useContext(CommentContext);
  return (
    <Dialog open={onOpen} onClose={onClose}>
      <DialogContent sx={{ maxWidth: "430px" }}>
        <DialogTitle sx={{ p: "0", marginBottom: "20px" }}>
          Delete comment
        </DialogTitle>
        <Typography
          component="p"
          sx={{ marginBottom: "20px", color: "neutral.grayishBlue" }}
        >
          Are you sure you want to delete this comment? This will remove the
          comment and it can't be undone.
        </Typography>
        <Stack direction="row" display="flex" justifyContent="space-between">
          <Button
            variant="variant"
            disableElevation
           
            onClick={onClose}
          >
            No, cancel
          </Button>
          <Button
            variant="variant"
            disableElevation
            
            onClick={() => {
            //   onDel ? onDel(comId) : deleteComment(id);
            }}
            className="text-red-800"
          >
            Yes, delete
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDelete;