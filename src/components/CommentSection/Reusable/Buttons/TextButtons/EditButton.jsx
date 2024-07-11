
import { Edit } from "@mui/icons-material";
import { Button } from "@mui/material";

const EditButton = ({ functionality, editingComm }) => {
  return (
    <button
    disabled={editingComm}
      onClick={() => {
        functionality();
      }}
      className="flex items-center gap-1 text-blue-700"
    >
      <Edit className="text-[18px]"/><p className="max-md:!hidden text-sm">Edit</p>
    </button>
  );
};

export default EditButton;
