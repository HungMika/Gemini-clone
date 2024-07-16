import React, { useRef } from "react";
import "./Settings.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import { useContext } from "react";

const Settings = ({ darkTheme, setDarkTheme }) => {
  const { openSetting, setOpenSetting, extended } = useContext(Context);
  const tab = useRef(null);
  const closeTab = (e) => {
    if (e.target === tab.current) {
      setOpenSetting(false);
    }
  };

  if (!openSetting) {
    return null;
  }

  return (
    <div className="setting-container" ref={tab} onClick={closeTab}>
      <div
        className={`settings ${darkTheme ? "dark-theme" : ""} ${
          extended ? "extended" : ""
        }`}
      >
        <div className="setting-choice">
          <img src={assets.puzzle_icon} className="setting-icon" />
          <p>Utilities</p>
        </div>
        <div className="setting-choice">
          <img src={assets.link_icon} className="setting-icon" />
          <p>Your public link</p>
        </div>
        <div className="setting-choice">
          <div className="UI-mode">
            <div className="UI-text">
              <img src={assets.moonUI_icon} className="setting-icon" />
              <p>Dark interface</p>
            </div>
            <img
              src={darkTheme ? assets.darkOn_btn : assets.darkOff_btn}
              className="UI-btn"
              onClick={() => setDarkTheme((prev) => !prev)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
