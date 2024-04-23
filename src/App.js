import React, { useState } from 'react';
import SideBar from "./SideBar";
import MainContent from './MainContent';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import './global.css';

const App = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddTaskClick = () => {
    setShowAddForm(true);
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <SideBar onAddTaskClick={handleAddTaskClick}/>
      </div>
      <div className="main-content">
        <MainContent showAddForm={showAddForm} setShowAddForm={setShowAddForm}/>
      </div>
    </div>
  );
}

export default App;
