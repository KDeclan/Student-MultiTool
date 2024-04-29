import React, { useState } from "react";
import SideBar from "./SideBar";
import MainContent from "./MainContent";
import { ThemeProvider } from "./ThemeContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./global.css";

const App = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("Full Schedule");

  const handleAddTaskClick = () => {
    setShowAddForm(true);
  };

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
};

export default App;
