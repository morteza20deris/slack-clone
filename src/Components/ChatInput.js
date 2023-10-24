import ArrowCircleDownTwoToneIcon from "@mui/icons-material/ArrowCircleDownTwoTone";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { Authentication, db } from "../Configs/FirebaseConfig";
import "./ChatInput.css";

export default function ChatInput({
  channelName,
  channelId,
  scrollDownBtnShow,
  scrollDownBtnClickHandler,
}) {
  const [input, setInput] = useState("");
  const currentUser = Authentication.currentUser;

  const sendButtonHandler = (e) => {
    e.preventDefault();
    addDoc(collection(db, "rooms", channelId, "Messages"), {
      message: input,
      timeStamp: serverTimestamp(),
      username: currentUser.displayName,
      userImage: currentUser.photoURL,
    });
    setInput("");
  };
  return (
    <div className="chatInput">
      <form>
        <input
          id="chatInput"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message ${channelName?.toLowerCase()}`}
        />
        <ArrowCircleDownTwoToneIcon
          onClick={scrollDownBtnClickHandler}
          className="chatInput__scrollDownBtn"
          style={{ display: scrollDownBtnShow ? "" : "none" }}
        />
        <button type="submit" onClick={sendButtonHandler}>
          Send
        </button>
      </form>
    </div>
  );
}
