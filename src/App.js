import React, { useState } from "react";
import SideBar from "./SideBar";
import MainContent from "./MainContent";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./global.css";

const App = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("Full Schedule");
  // You have finished settings ui with dark mode toggle. Add dark mode functionality here. use a context, consult notes

  const handleAddTaskClick = () => {
    setShowAddForm(true);
  };

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <SideBar
          onAddTaskClick={handleAddTaskClick}
          onFilterChange={handleFilterChange}
        />
      </div>
      <div className="main-content">
        <MainContent
          showAddForm={showAddForm}
          setShowAddForm={setShowAddForm}
          currentFilter={currentFilter}
        />
      </div>
    </div>
  );
};

export default App;
