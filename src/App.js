import React, { useState, lazy, Suspense } from "react";
import { ThemeProvider } from "./ThemeContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./global.css";

const SideBar = lazy(() => import("./SideBar"));
const MainContent = lazy(() => import("./MainContent"));

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
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
      </div>
    </ThemeProvider>
  );
};

export default App;
