import { Button } from "@mui/material";
import { RiReplyFill } from 'react-icons/ri'; 

const ReplyButton = ({ functionality }) => {
  return (
    <button
      onClick={() => {
        functionality();
      }}
      className="flex items-center gap-1 text-blue-700"
    >
      < RiReplyFill className="md:text-[18px] text-[15px]"/><p className="max-md:!hidden text-sm">Reply</p>
    </button>
  );
};

export default ReplyButton;