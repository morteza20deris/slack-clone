import React from "react";
import { useNavigate } from "react-router-dom";
import "./SidebarOption.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../Configs/FirebaseConfig";

function SidebarOption({ Icon, title, addChannelOptions, id }) {
  const navigate = useNavigate();
  const selectChannel = () => {
    if (id) {
      navigate(`/room/${id}`);
    } else {
      navigate("/title");
    }
  };
  const addChannel = () => {
    const channelName = prompt("Please Enter A Channel Name");
    if (channelName) {
      addDoc(collection(db, "rooms"), { name: channelName });
    }
  };
  return (
    <div
      className="sidebarOption"
      onClick={addChannelOptions ? addChannel : selectChannel}
    >
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <h3 className="sidebarOption__channel">
          <span className="sidebarOption__hash">#{title}</span>
        </h3>
      )}
    </div>
  );
}

export default SidebarOption;
