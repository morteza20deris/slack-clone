import React, { useEffect, useState } from "react";
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

export default function Chat() {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState(null);
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

      //   onSnapshot(test2, (document) => {
      //     setRoomMessages(document.data());
      //   });
    }
  }, [roomId]);
  console.log(roomMessages);
  return (
    <div className="chat">
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
        <Message />
      </div>
    </div>
  );
}
