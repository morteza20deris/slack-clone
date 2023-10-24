import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Authentication } from "../Configs/FirebaseConfig";
import "./Header.css";
export default function Header() {
  const currentUser = Authentication.currentUser;
  const [showSideBar, setShowSideBar] = useState(true);
  const chatInput = document.getElementById("chatInput");
  const sidebar = document.getElementById("sidebar");
  const chat = document.getElementById("chat");

  useEffect(() => {
    if (sidebar && showSideBar && chat) {
      sidebar.style.transform = "translate(0)";
    } else if (sidebar && !showSideBar && chat) {
      sidebar.style.transform = "translate(-100%)";
    }
    if (chatInput) {
      chatInput.style.width = chat.offsetWidth + "px";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSideBar]);
  return (
    <>
      <div className="header">
        <div className="header__left">
          <MenuIcon onClick={() => setShowSideBar(!showSideBar)} />
        </div>
        <div className="header__search">
          <SearchIcon />
          <input placeholder="Search..." />
        </div>
        <div className="header__right">
          <Avatar
            onClick={() => {
              window.confirm("Are you sure you want to Sign out?") &&
                Authentication.signOut();
            }}
            className="header__avatar"
            alt={currentUser.displayName}
            src={currentUser.photoURL}
          />
        </div>
      </div>
    </>
  );
}
