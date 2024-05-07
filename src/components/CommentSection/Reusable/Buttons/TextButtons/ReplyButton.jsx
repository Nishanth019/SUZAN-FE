import { Button } from "@mui/material";
import { RiReplyFill } from 'react-icons/ri'; 

const ReplyButton = ({ functionality }) => {
  return (
    <Button
      startIcon={<RiReplyFill />}
      sx={{
        color: "custom.moderateBlue",
        fontWeight: 500,
        textTransform: "capitalize",
      }}
      onClick={() => {
        functionality();
      }}
    >
      Reply
    </Button>
  );
};

export default ReplyButton;