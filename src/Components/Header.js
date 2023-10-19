import React from "react";
import "./Header.css";
import { Avatar } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Authentication } from "../Configs/FirebaseConfig";

export default function Header() {
  const currentUser = Authentication.currentUser;
  console.log(currentUser.photoURL);
  return (
    <div className="header">
      <div className="header__left">
        <Avatar
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
