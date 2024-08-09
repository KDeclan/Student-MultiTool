import React, { useState, lazy, Suspense } from "react";
import { ThemeProvider } from "./ThemeContext";
import { useSwipeable } from "react-swipeable";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./global.css";

const SideBar = lazy(() => import("./SideBar"));
const MainContent = lazy(() => import("./MainContent"));

const App = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("Full Schedule");
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handleAddTaskClick = () => {
    setShowAddForm(true);
  };

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setSidebarVisible(false),
    onSwipedRight: () => setSidebarVisible(true),
  });

  return (
    <ThemeProvider>
      <div className="app-container" {...swipeHandlers}>
        <Suspense fallback={<div>Loading...</div>}>
          <div className={`sidebar ${sidebarVisible ? "visible" : "hidden"}`}>
            <SideBar
              onAddTaskClick={handleAddTaskClick}
              onFilterChange={handleFilterChange}
              toggleSidebar={toggleSidebar}
            />
          </div>
          <div className={`main-content ${sidebarVisible ? "" : "expanded"}`}>
            <button
              className="toggle-sidebar-btn"
              onClick={toggleSidebar}
              style={{ display: sidebarVisible ? "none" : "block" }}
            >
              ☰
            </button>
            <MainContent
              showAddForm={showAddForm}
              setShowAddForm={setShowAddForm}
              currentFilter={currentFilter}
              toggleSidebar={toggleSidebar}
            />
          </div>
        </Suspense>
      </div>
    </ThemeProvider>
  );
};

export default App;
