import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import React from "react";
import { Authentication } from "../Configs/FirebaseConfig";
import "./Header.css";

export default function Header() {
  const currentUser = Authentication.currentUser;
  return (
    <div className="header">
      <div className="header__left">
        <Avatar
          onClick={() => {
            window.confirm("Are you sure you want to Sign out?") &&
              Authentication.signOut();
          }}
          className="header__avatar"
          alt={currentUser.displayName}
          src={currentUser.photoURL}
        />
        <AccessTimeIcon />
      </div>
      <div className="header__search">
        <SearchIcon />
        <input placeholder="Search..." />
      </div>
      <div className="header__right">
        <HelpOutlineIcon />
      </div>
    </div>
  );
}
