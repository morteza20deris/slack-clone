import React from "react";
import "./Message.css";
import { Avatar } from "@mui/material";
function Message({ message, timeStamp, username, userImage }) {
  return (
    <div className="message">
      {userImage && (
        <Avatar
          style={{ backgroundColor: "gray" }}
          src={userImage}
          alt={username}
        />
      )}
      <div className="message__info">
        <h4>
          {username}
          <span className="message__timeStamp">
            {new Date(timeStamp?.toDate()).toUTCString()}
          </span>{" "}
        </h4>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Message;
