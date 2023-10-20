import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Authentication, db } from "../Configs/FirebaseConfig";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
function Sidebar() {
  const [channels, setChannels] = useState([]);
  const currentUser = Authentication.currentUser;
  useEffect(() => {
    const test = async () => {
      onSnapshot(collection(db, "rooms"), (collection) => {
        setChannels(
          collection.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
          }))
        );
      });
    };
    test();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__info">
          <h2>Slack Clone</h2>
          <h3>
            <FiberManualRecordIcon className="username__icon" />
            {currentUser.displayName}
          </h3>
        </div>
        <CreateIcon />
      </div>

      <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
      <hr />
      <SidebarOption
        addChannelOptions={true}
        Icon={AddIcon}
        title="Add Channel"
      />
      {/* Get Channels from Db and list them here using SidebarOption Component */}
      {channels.map((channel) => (
        <SidebarOption key={channel.id} id={channel.id} title={channel.name} />
      ))}
    </div>
  );
}

export default Sidebar;
