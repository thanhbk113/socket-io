import "./navbar.css";

import {
  MessageOutlined,
  NotificationOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { useEffect } from "react";
import { useState } from "react";

const Navbar = ({ socket }) => {
  const [notification, setNotification] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotification((prev) => [...prev, data]);
    });
  }, [socket]);

  const displayNottification = ({ senderName, type }) => {
    let action;

    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }

    return (
      <span className="notification">{`${senderName} ${action} your post`}</span>
    );
  };
  const handleRead = () => {
    setNotification([]);
    setOpen(false);
  };
  return (
    <div className="navbar">
      <span className="logo">Socket App</span>
      <div className="icons">
        <div className="icon" onClick={() => setOpen(!open)}>
          <NotificationOutlined alt="notification" className="iconImg" />
          {notification.length > 0 && (
            <div className="counter">{notification.length}</div>
          )}
        </div>
        <div className="icon" onClick={() => setOpen(!open)}>
          <MessageOutlined alt="message" className="iconImg" />
        </div>
        <div className="icon" onClick={() => setOpen(!open)}>
          <SettingOutlined alt="setting" className="iconImg" />
        </div>
        {open && (
          <div className="notifications">
            {notification.map((n) => displayNottification(n))}
            <button className="nButton" onClick={handleRead}>
              Mark as read
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
