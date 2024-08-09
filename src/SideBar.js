import React, { useState, useEffect, useCallback, useRef } from "react";
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
  FaMusic,
  FaBars,
} from "react-icons/fa";
import { GoArrowUp, GoArrowDown, GoMoon } from "react-icons/go";
import { IoAddCircle } from "react-icons/io5";
import "./SideBar.css";
import "./global.css";

const SideBar = ({ onAddTaskClick, onFilterChange, toggleSidebar }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showQuoteDisplay, setShowQuoteDisplay] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [studyTime, setStudyTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [backgroundColor, setBackgroundColor] = useState("");
  const [quote, setQuote] = useState({
    text: "Press 'New Quote' Button",
    author: "",
  });
  const { theme, toggleTheme } = useTheme();

  const incrementStudy = () => {
    if (studyTime < 60) setStudyTime(studyTime + 1);
  };
  const decrementStudy = () => {
    if (studyTime > 1) setStudyTime(studyTime - 1);
  };
  const incrementBreak = () => {
    if (breakTime < 30) setBreakTime(breakTime + 1);
  };
  const decrementBreak = () => {
    if (breakTime > 1) setBreakTime(breakTime - 1);
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
      .then((data) => setQuote({ text: data.content, author: data.author }))
      .catch(() => setQuote({ text: "Failed to load quote", author: "" }));
  };

  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(studyTime * 60);
  const [intervalId, setIntervalId] = useState(null);
  const [isStudyTime, setIsStudyTime] = useState(true);
  const [alarmPlaying, setAlarmPlaying] = useState(false);
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    audioRef.current = new Audio(process.env.PUBLIC_URL + "/timer-sound.mp3");
    return () => {
      audioRef.current.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    setTimeLeft((isStudyTime ? studyTime : breakTime) * 60);
  }, [studyTime, breakTime, isStudyTime]);

  const toggleTimer = useCallback(() => {
    if (timerActive) {
      clearInterval(intervalId);
      setIntervalId(null);
    } else {
      const id = setInterval(() => {
        setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
      }, 1000);
      setIntervalId(id);
    }
    setTimerActive(!timerActive);
  }, [timerActive, intervalId]);

  const playSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setAlarmPlaying(true);
          toggleTimer();
          setIsStudyTime(!isStudyTime);
          setTimeLeft((isStudyTime ? breakTime : studyTime) * 60);
        })
        .catch((err) => console.error("Failed to play sound:", err));
    }
  }, [toggleTimer, studyTime, breakTime, isStudyTime]);

  useEffect(() => {
    if (timeLeft === 0) playSound();
  }, [timeLeft, playSound]);

  const stopTimer = () => {
    if (intervalId) clearInterval(intervalId);
    setTimerActive(false);
    setIntervalId(null);
    setTimeLeft((isStudyTime ? studyTime : breakTime) * 60);
  };

  const stopAlarm = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setAlarmPlaying(false);
    }
  };

  const formatTime = (timeLeft) => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      id="sidebar-top-level"
      className="d-flex flex-column align-items-center justify-content-between vh-100"
      data-theme={theme}
    >
      <div id="sidebar-header" className="w-100 text-right p-2">
        <FaBars
          onClick={toggleSidebar}
          className="d-md-none"
          style={{ cursor: "pointer" }}
        />
      </div>
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
        <TimerDisplay
          handleShowTimer={() => setShowTimer(!showTimer)}
          studyTime={studyTime}
          breakTime={breakTime}
          incrementStudy={incrementStudy}
          decrementStudy={decrementStudy}
          incrementBreak={incrementBreak}
          decrementBreak={decrementBreak}
          timerActive={timerActive}
          timeLeft={timeLeft}
          toggleTimer={toggleTimer}
          stopTimer={stopTimer}
          formatTime={formatTime}
          alarmPlaying={alarmPlaying}
          stopAlarm={stopAlarm}
          volume={volume}
          setVolume={setVolume}
        />
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
        <GoMoon /> Dark Mode
      </h2>
      <label className="toggle-switch">
        <input
          type="checkbox"
          className="toggle-switch-checkbox"
          onChange={toggleTheme}
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

const TimerDisplay = ({
  handleShowTimer,
  studyTime,
  breakTime,
  incrementStudy,
  decrementStudy,
  incrementBreak,
  decrementBreak,
  timerActive,
  timeLeft,
  toggleTimer,
  stopTimer,
  formatTime,
  alarmPlaying,
  stopAlarm,
  volume,
  setVolume,
}) => (
  <>
    <div id="timer-display" className="border-bar">
      <h2>
        <FaStopwatch /> Study Clock
      </h2>
    </div>
    <div id="timer-container">
      <div id="study-section">
        <p>Study</p>
        <p className="hover-effect" onClick={incrementStudy}>
          <GoArrowUp color="var(--accent-color)" />
        </p>
        <p>{studyTime}</p>
        <p className="hover-effect" onClick={decrementStudy}>
          <GoArrowDown color="var(--accent-color)" />
        </p>
      </div>
      <div id="break-section">
        <p>Break</p>
        <p className="hover-effect" onClick={incrementBreak}>
          <GoArrowUp color="var(--accent-color)" />
        </p>
        <p>{breakTime}</p>
        <p className="hover-effect" onClick={decrementBreak}>
          <GoArrowDown color="var(--accent-color)" />
        </p>
      </div>
    </div>
    <div
      id="time-display"
      className="card p-3"
      style={{ color: "black", fontSize: "2rem" }}
    >
      <p style={{ backgroundColor: "#ccc", borderRadius: ".2em" }}>
        {formatTime(timeLeft)}
      </p>
      <div id="time-btns">
        <button className="btn btn-primary" onClick={toggleTimer}>
          {timerActive ? <FaPause /> : <FaPlay />}
        </button>
        <button className="btn btn-primary" onClick={stopTimer}>
          <FaStop />
        </button>
        {alarmPlaying && (
          <button className="btn btn-warning" onClick={stopAlarm}>
            <FaMusic />
          </button>
        )}
      </div>
    </div>
    <div className="volume-slider-container">
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(e.target.value)}
        style={{ width: "100%", background: "transparent" }}
      />
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
