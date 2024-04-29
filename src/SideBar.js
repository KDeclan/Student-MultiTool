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
  FaPlay,
  FaPause,
  FaStop,
} from "react-icons/fa";
import { GoArrowUp, GoArrowDown, GoMoon } from "react-icons/go";
import { IoAddCircle } from "react-icons/io5";
import "./SideBar.css";
import "./global.css";

const SideBar = ({ onAddTaskClick, onFilterChange }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showQuoteDisplay, setShowQuoteDisplay] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");
  const [quote, setQuote] = useState({
    text: "Press 'New Quote' Button",
    author: "",
  });
  const { theme, toggleTheme } = useTheme();

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
      .then((data) => setQuote({ text: data.content, author: data.author }))
      .catch(() => setQuote({ text: "Failed to load quote", author: "" }));
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
        <SettingsSection
          handleSettingsClick={() => setShowSettings(!showSettings)}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      ) : showQuoteDisplay ? (
        <QuoteDisplay
          quote={quote}
          handleNewQuote={handleNewQuote}
          handleQuoteDisplay={() => setShowQuoteDisplay(!showQuoteDisplay)}
          backgroundColor={backgroundColor}
        />
      ) : showTimer ? (
        <TimerDisplay handleShowTimer={() => setShowTimer(!showTimer)} />
      ) : (
        <MainSection
          onAddTaskClick={onAddTaskClick}
          onFilterChange={onFilterChange}
          handleSettingsClick={() => setShowSettings(!showSettings)}
          handleQuoteDisplay={() => setShowQuoteDisplay(!showQuoteDisplay)}
          handleShowTimer={() => setShowTimer(!showTimer)}
        />
      )}
    </div>
  );
};

const SettingsSection = ({ handleSettingsClick, theme, toggleTheme }) => (
  <>
    <div id="settings-top-bar">
      <h2 id="settings-head-text">
        <FaCog /> Settings
      </h2>
    </div>
    <div id="color-settings">
      <h2>
        <GoMoon />
        Dark Mode
      </h2>
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
);

const QuoteDisplay = ({
  quote,
  handleNewQuote,
  handleQuoteDisplay,
  backgroundColor,
}) => (
  <>
    <div id="quote-display">
      <h2>
        <FaQuoteRight size="1.5rem" /> Quote Machine
      </h2>
    </div>
    <div id="quote-text">
      <p className="card p-3" style={{ color: "black", backgroundColor }}>
        {quote.text}
      </p>
      <p style={{ alignSelf: "flex-end" }}>- {quote.author || "Unknown"}</p>
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
);

const TimerDisplay = ({ handleShowTimer }) => (
  <>
    <div id="timer-display" className="border-bar">
      <h2>
        <FaStopwatch /> Study Clock
      </h2>
    </div>
    <div id="timer-container">
      <div id="study-section">
        <p>Study</p>
        <p className="hover-effect">
          <GoArrowUp color="var(--accent-color)" />
        </p>
        <p>25</p>
        <p className="hover-effect">
          <GoArrowDown color="var(--accent-color)" />
        </p>
      </div>
      <div id="break-section">
        <p>Break</p>
        <p className="hover-effect">
          <GoArrowUp color="var(--accent-color)" />
        </p>
        <p>5</p>
        <p className="hover-effect">
          <GoArrowDown color="var(--accent-color)" />
        </p>
      </div>
    </div>
    <div id="time-display" className="card p-3">
      <p
        style={{
          backgroundColor: "#b1b1b1",
          color: "var(--text-color)",
          borderRadius: ".5em",
          fontSize: "2rem",
        }}
      >
        25:00
      </p>
      <div id="time-btns">
        <button className="btn btn-primary">
          <FaPlay />
        </button>
        <button className="btn btn-primary">
          <FaStop />
        </button>
      </div>
    </div>
    <div className="hover-effect return-btn-section">
      <button className="btn return-btn" onClick={handleShowTimer}>
        ◄ Return
      </button>
    </div>
  </>
);

const MainSection = ({
  onAddTaskClick,
  onFilterChange,
  handleSettingsClick,
  handleQuoteDisplay,
  handleShowTimer,
}) => (
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
      <p className="hover-effect" onClick={handleShowTimer}>
        <FaStopwatch /> Study Clock
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
);

export default SideBar;
