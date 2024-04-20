import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCalendarDay, FaCalendarWeek, FaCalendarAlt, FaCog, FaStopwatch, FaQuoteRight } from 'react-icons/fa';
import { IoAddCircle } from 'react-icons/io5';
import './SideBar.css';

const SideBar = () => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-between vh-100"
      style={{ backgroundColor: '#EEEEEE', boxShadow: '.2em 0 .5em rgba(0,0,0,0.3)', position: 'fixed', width: '20em', top: 0, left: 0 }}
    >
      <div id="add-bttn-section" className="hover-effect" style={{ fontSize: '2rem', marginTop: '.5em' }}>
      <p id="add-bttn"><IoAddCircle /> Add Task</p>
      </div>
      <div id="date-tags" style={{ fontSize: '2rem', margin: '1em 0' }}>
        <p id="today-tag" className="hover-effect"><FaCalendarDay /> Today</p>
        <p id="sevenDay-tag" className="hover-effect"><FaCalendarWeek /> Next 7 Days</p>
        <p id="fullDay-tag" className="hover-effect"><FaCalendarAlt /> Full Schedule</p>
      </div>
      <div id="tools" style={{ fontSize: '2rem', margin: '1em 0' }}>
        <p className="hover-effect"><FaStopwatch /> Pomodoro</p>
        <p className="hover-effect"><FaQuoteRight size='1.5rem'/> Quote Machine</p>
      </div>
      <div id="settings" className="hover-effect" style={{ fontSize: '2rem', marginBottom: '.5em' }}>
      <p><FaCog /> Settings</p>
      </div>
    </div>
  );
};

export default SideBar;
