import "./card.css";

import {
  CommentOutlined,
  HeartFilled,
  HeartOutlined,
  InfoCircleOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";

import Comment from "./Comment";
import { useState } from "react";

const Card = ({ post, socket, user }) => {
  const [liked, setLiked] = useState(false);
  const [openInput, setOpenInput] = useState(false);
  const [textInput, setTextInput] = useState("");

  const handleNotification = (type) => {
    setLiked(!liked);
    socket.emit("sendNotification", {
      senderName: user,
      receiverName: post.username,
      type,
    });
  };
  const handleInput = (e) => {
    setTextInput(e.target.value);
  };
  const handleSendInput = (type) => {
    handleNotification(2);
    setOpenInput(false);
    socket.emit("sendComment", {
      senderComment: user,
      receiverComment: post.username,
      senderText: textInput,
    });
  };

  return (
    <div className="card">
      <div className="info">
        <img src={post.userImg} alt="" className="userImg" />
        <span>{post.fullname}</span>
      </div>
      <img src={post.postImg} alt="" className="postImg" />
      <div className="interaction">
        {liked ? (
          <HeartFilled
            className="cardIcon"
            onClick={() => handleNotification()}
          />
        ) : (
          <HeartOutlined
            className="cardIcon"
            onClick={() => handleNotification(1)}
          />
        )}
        <CommentOutlined
          className="cardIcon"
          onClick={() => {
            setOpenInput(!openInput);
          }}
        />
        <ShareAltOutlined
          className="cardIcon"
          onClick={() => handleNotification(3)}
        />
        <InfoCircleOutlined
          className="cardIcon infoIcon"
          onClick={() => handleNotification(4)}
        />
      </div>
      {openInput && (
        <div className="commentInput">
          <input type="text" onChange={(e) => handleInput(e)} />
          <button className="iButton" onClick={() => handleSendInput(2)}>
            Send
          </button>
        </div>
      )}
      <Comment socket={socket} />
    </div>
  );
};

export default Card;
