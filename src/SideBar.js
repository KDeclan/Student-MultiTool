import React, { useState } from "react";
import { useTheme } from "./ThemeContext";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaCalendarDay,
  FaCalendarWeek,
  FaCalendarAlt,
  FaCog,
  FaStopwatch,
  FaQuoteRight,
} from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import "./SideBar.css";
import "./global.css";

const SideBar = ({ onAddTaskClick, onFilterChange }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showQuoteDisplay, setShowQuoteDisplay] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");
  const [quote, setQuote] = useState({
    text: "Press 'New Quote' Button",
    author: "",
  });
  const { theme, toggleTheme } = useTheme();

  const handleQuoteDisplay = () => {
    setShowQuoteDisplay(!showQuoteDisplay);
  };

  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
  };

  const handleNewQuote = () => {
    const quoteColors = [
      "#c8f4f3",
      "#ff8680",
      "#c2ffa9",
      "#ffb783",
      "#ff97ed",
      "#b395ff",
      "#A87676",
      "#EBE3D5",
      "#ffe9aa",
    ];
    const randomColor =
      quoteColors[Math.floor(Math.random() * quoteColors.length)];
    setBackgroundColor(randomColor);

    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => {
        setQuote({ text: data.content, author: data.author });
      })
      .catch((error) => {
        setQuote({ text: "Failed to load quote", author: "" });
      });
  };

  return (
    <div
      id="sidebar-top-level"
      className="d-flex flex-column align-items-center justify-content-between vh-100"
      data-theme={theme}
      style={{
        boxShadow: ".2em 0 .5em var(--sidebar-shadow)",
        position: "fixed",
        width: "20em",
        top: 0,
        left: 0,
      }}
    >
      {showSettings ? (
        <>
          <div id="settings-top-bar">
            <h2 id="settings-head-text">
              <FaCog /> Settings
            </h2>
          </div>
          <div id="color-settings">
            <h2>Dark Mode</h2>
            <label className="toggle-switch">
              <input
                type="checkbox"
                className="toggle-switch-checkbox"
                onClick={toggleTheme}
                checked={theme === "dark"}
              />
              <span className="toggle-switch-slider"></span>
            </label>
          </div>
          <div className="hover-effect return-btn-section">
            <button className="btn return-btn" onClick={handleSettingsClick}>
              ◄ Return
            </button>
          </div>
        </>
      ) : showQuoteDisplay ? (
        <>
          <div id="quote-display">
            <h2>
              <FaQuoteRight size="1.5rem" /> Quote Machine
            </h2>
          </div>
          <div id="quote-text">
            <p
              className="card p-3"
              style={{
                color: "black",
                backgroundColor: backgroundColor,
              }}
            >
              {quote.text}
            </p>
            <p style={{ alignSelf: "flex-end" }}>
              - {quote.author || "Unknown"}
            </p>
          </div>
          <div id="new-quote-btn">
            <button className="btn btn-primary" onClick={handleNewQuote}>
              New Quote
            </button>
          </div>
          <div className="hover-effect return-btn-section">
            <button className="btn return-btn" onClick={handleQuoteDisplay}>
              ◄ Return
            </button>
          </div>
        </>
      ) : (
        <>
          <div
            id="add-bttn-section"
            className="hover-effect"
            style={{ fontSize: "2rem", marginTop: ".5em" }}
          >
            <p id="add-bttn" onClick={onAddTaskClick}>
              <IoAddCircle /> Add Task
            </p>
          </div>
          <div
            id="date-tags"
            className="border-bar"
            style={{ fontSize: "2rem", margin: "1em 0" }}
          >
            <p
              id="today-tag"
              className="hover-effect"
              onClick={() => onFilterChange("Today")}
            >
              <FaCalendarDay /> Today
            </p>
            <p
              id="sevenDay-tag"
              className="hover-effect"
              onClick={() => onFilterChange("Next 7 Days")}
            >
              <FaCalendarWeek /> Next 7 Days
            </p>
            <p
              id="fullDay-tag"
              className="hover-effect"
              onClick={() => onFilterChange("Full Schedule")}
            >
              <FaCalendarAlt /> Full Schedule
            </p>
          </div>
          <div
            id="tools"
            className="border-bar"
            style={{ fontSize: "2rem", margin: "1em 0" }}
          >
            <p className="hover-effect" onClick={handleQuoteDisplay}>
              <FaQuoteRight size="1.5rem" /> Quote Machine
            </p>
            <p className="hover-effect">
              <FaStopwatch /> Pomodoro
            </p>
          </div>
          <div
            id="settings"
            className="hover-effect"
            style={{ fontSize: "2rem", marginBottom: ".5em" }}
          >
            <p onClick={handleSettingsClick}>
              <FaCog /> Settings
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default SideBar;
