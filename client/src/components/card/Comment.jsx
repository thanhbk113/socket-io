import { useEffect } from "react";
import { useState } from "react";

const Comment = ({ socket }) => {
  const [senderComment, setSenderComment] = useState("");
  const [senderText, setSenderText] = useState("");
  useEffect(() => {
    socket.on("getComment", (data) => {
      console.log(data);
      setSenderComment(data.senderComment);
      setSenderText(data.senderText);
      console.log(data);
    });
  }, [socket]);

  const displayComment = ({ senderComment, senderText }) => {
    return (
      <div className="commented">
        <span>{senderComment}</span>
        <span>{senderText}</span>
      </div>
    );
  };
  return <div>{displayComment({ senderComment, senderText })}</div>;
};

export default Comment;
