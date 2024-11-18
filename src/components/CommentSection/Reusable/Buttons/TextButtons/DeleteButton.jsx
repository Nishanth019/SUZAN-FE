import { Delete } from "@mui/icons-material";
import { Button } from "@mui/material";

const DeleteButton = ({ functionality }) => {
  return (
    <button
      onClick={() => {
        functionality();
      }}
      className="flex items-center gap-1 text-red-700"
    >
      <Delete className="!text-[17px] sm:!text-[18px]"/><p className="max-md:!hidden !text-sm">Delete</p>
    </button>
  );
};

export default DeleteButton;