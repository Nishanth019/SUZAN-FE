import { Typography } from "@mui/material";
import Tag from "./Tag";

const ReplyText = ({ repText, onTar }) => {
  return (
    <Typography
      component="div"
      sx={{ color: "neutral.grayishBlue", p: "10px 0" }}
      className="!text-[17px] md:!text-lg"
    >
      <Tag onTar={onTar} />{" "}
      {repText}
    </Typography>
  );
};

export default ReplyText;