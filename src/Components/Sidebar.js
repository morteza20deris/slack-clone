import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import CreateIcon from "@mui/icons-material/Create";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AppsIcon from "@mui/icons-material/Apps";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import SidebarOption from "./SidebarOption";
import { db } from "../Configs/FirebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
function Sidebar() {
  const [channels, setChannels] = useState([]);

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
            Morteza Deris
          </h3>
        </div>
        <CreateIcon />
      </div>
      <SidebarOption Icon={InsertCommentIcon} title="threads" />
      <SidebarOption Icon={InboxIcon} title="Mentions & Reactions" />
      <SidebarOption Icon={DraftsIcon} title="Saved items" />
      <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser" />
      <SidebarOption Icon={PeopleAltIcon} title="people & User Groups" />
      <SidebarOption Icon={AppsIcon} title="Apps" />
      <SidebarOption Icon={FileCopyIcon} title="File Browser" />
      <SidebarOption Icon={ExpandLessIcon} title="Show Less" />
      <hr />
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
