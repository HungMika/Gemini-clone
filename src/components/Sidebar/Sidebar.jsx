import React, { useContext } from "react";
import { useState } from "react";
import "./Sidebar.css";
import { assets } from "./../../assets/assets";
import { Context } from "../../context/Context";
const Sidebar = ({ darkTheme, setDarkTheme }) => {
  const {
    onSent,
    prevPrompts,
    setRecentPrompt,
    newChat,
    openSetting,
    setOpenSetting,
    extended,
    setExtended,
  } = useContext(Context);

  const loadPrompts = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className={`sidebar ${darkTheme ? "dark-theme" : ""}`}>
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt=""
        />
        <div className="new-chat">
          <img onClick={() => newChat()} src={assets.plus_icon} alt="" />

          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-tittle">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div onClick={() => loadPrompts(item)} className="recent-entry">
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0, 18)} ...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img
            src={assets.question_icon}
            onClick={() =>
              alert("this function is unavailable now, We will update it later")
            }
            alt=""
          />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img
            src={assets.history_icon}
            onClick={() =>
              alert("this function is unavailable now, We will update it later")
            }
            alt=""
          />
          {extended ? <p>Activity</p> : null}
        </div>
        <div
          className="bottom-item recent-entry"
          onClick={() => setOpenSetting((prev) => !prev)}
          alt=""
        >
          <img src={assets.settings_icon} />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
