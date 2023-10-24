import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import { useParams } from "react-router-dom";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { db } from "../Configs/FirebaseConfig";
import {
  onSnapshot,
  doc,
  collection,
  orderBy,
  query,
} from "firebase/firestore";
import Message from "./Message";
import ChatInput from "./ChatInput";

export default function Chat() {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const endPageRef = useRef(null);
  const chatPageRef = useRef(null);
  const endPagePercentage = 150;
  const scrollToEndOfPage = () => {
    chatPageRef.current.scrollTo({
      top:
        chatPageRef.current?.scrollHeight - chatPageRef.current?.clientHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const max =
      chatPageRef.current?.scrollHeight - chatPageRef.current?.clientHeight;

    const test = max - endPagePercentage;

    if (chatPageRef.current?.scrollTop > test) {
      scrollToEndOfPage();
    }
  }, [roomMessages.length]);
  useEffect(() => {
    scrollDownButtonHandler();
  }, [chatPageRef.current?.scrollTop, roomMessages]);

  useEffect(() => {
    scrollToEndOfPage();
  }, [roomDetails?.name]);

  const scrollDownButtonHandler = () => {
    const max =
      chatPageRef.current?.scrollHeight - chatPageRef.current?.clientHeight;
    const test = max - endPagePercentage;
    chatPageRef.current?.scrollTop < test
      ? setShowScrollBtn(true)
      : setShowScrollBtn(false);
  };

  useEffect(() => {
    if (roomId) {
      onSnapshot(doc(db, "rooms", roomId), (document) => {
        setRoomDetails(document.data());
      });
      const test = query(
        collection(db, "rooms", roomId, "Messages"),
        orderBy("timeStamp", "asc")
      );
      onSnapshot(test, (messages) => {
        setRoomMessages(messages.docs.map((doc) => doc.data()));
      });
      scrollDownButtonHandler();
    }
  }, [roomId]);
  return (
    <div
      id="chat"
      ref={chatPageRef}
      onScroll={(e) => {
        scrollDownButtonHandler();
      }}
      className="chat"
    >
      <div className="chat__header">
        <div className="chat__headerLeft">
          <h4 className="chat__channelName">
            <strong>#{roomDetails?.name}</strong>
            <StarBorderOutlinedIcon />
          </h4>
        </div>
        <div className="chat__headerRight">
          <p>
            <InfoOutlinedIcon />
            Details
          </p>
        </div>
      </div>
      <div className="chat__messages">
        {roomMessages.map(({ username, userImage, message, timeStamp }) => (
          <Message
            key={timeStamp}
            message={message}
            timeStamp={timeStamp}
            userImage={userImage}
            username={username}
          />
        ))}
        <div ref={endPageRef} />
      </div>

      <ChatInput
        scrollDownBtnShow={showScrollBtn}
        channelName={roomDetails?.name}
        channelId={roomId}
        scrollDownBtnClickHandler={() => {
          scrollToEndOfPage();
        }}
      />
    </div>
  );
}
