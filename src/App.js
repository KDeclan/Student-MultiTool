import React from "react";
import SideBar from "./SideBar";
import MainContent from './MainContent';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

const App = () => {
  return (
    <div className="app-container" style={{ backgroundColor: 'FFFFFF' }}>
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="main-content">
        <MainContent />
      </div>
    </div>
  );
}

export default App;
