import React, { useState } from "react";
import "./ChatInput.css";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Authentication, db } from "../Configs/FirebaseConfig";

export default function ChatInput({ channelName, channelId }) {
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
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message ${channelName?.toLowerCase()}`}
        />
        <button type="submit" onClick={sendButtonHandler}>
          Send
        </button>
      </form>
    </div>
  );
}
