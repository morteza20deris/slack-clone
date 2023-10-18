import React from "react";
import "./Header.css";
import { Avatar } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function Header() {
  return (
    <div className="header">
      <div className="header__left">
        <Avatar className="header__avatar" alt="Morteza" src="" />
        <AccessTimeIcon />
      </div>
      <div className="header__search">Header Search</div>
      <div className="header__right">Header right</div>
    </div>
  );
}
