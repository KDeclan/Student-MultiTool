import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useTheme } from "./ThemeContext";
import { FaTimes, FaTrash } from "react-icons/fa";
import "./MainContent.css";
import "./global.css";

const MainContent = ({ showAddForm, setShowAddForm, currentFilter }) => {
  const [timeOfDay, setTimeofDay] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const { theme } = useTheme();

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const newTodo = {
      name: taskName,
      date: taskDate,
      toggled: false,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    setTaskName("");
    setTaskDate("");
    setShowAddForm(false);
  };

  const toggleTodo = (index) => {
    const newTodos = todos.map((todo, idx) => {
      if (idx === index) {
        return { ...todo, toggled: !todo.toggled };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, idx) => idx !== index);
    setTodos(updatedTodos);
  };

  const handleCancel = () => {
    setShowAddForm(false);
  };

  const isDayOrNight = useCallback(() => {
    const now = new Date();
    const hour = now.getHours();

    const morningMessages = [
      "Good Morning 🌞",
      "Early Bird Gets The 🪱",
      "Rise and Shine! 🌅",
    ];
    const afternoonMessages = [
      "Good Afternoon 🤠",
      "Another Day Another 💵!",
      "Don't Forget to Take Breaks! 🙂",
    ];
    const nightMessages = [
      "Good Night 😴",
      "💤💤💤",
      "It's Late 🌙 Remember to Take Breaks",
    ];

    const getRandomMessage = (messages) => {
      const index = Math.floor(Math.random() * messages.length);
      return messages[index];
    };

    if (hour >= 0 && hour <= 11) {
      return getRandomMessage(morningMessages);
    } else if (hour >= 12 && hour < 18) {
      return getRandomMessage(afternoonMessages);
    } else {
      return getRandomMessage(nightMessages);
    }
  }, []);

  useEffect(() => {
    const updateTimeOfDay = () => {
      setTimeofDay(isDayOrNight());
    };

    updateTimeOfDay();

    const interval = setInterval(updateTimeOfDay, 3600000); // 3600000 ms = 1 hour
    return () => clearInterval(interval);
  }, [isDayOrNight]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = useFilteredTodos(todos, currentFilter);

  return (
    <div
      id="maincontent-top-level"
      className="d-flex flex-column vh-100"
      data-theme={theme}
    >
      <div id="main-heading" style={{ alignSelf: "center" }}>
        <h1
          className="animated-text"
          key={timeOfDay}
          style={{ fontSize: "3rem" }}
        >
          {timeOfDay}
        </h1>
        <h2 className="text-center" style={{ marginTop: ".5em" }}>
          {currentFilter}
        </h2>
      </div>
      <div id="main-body" style={{ marginTop: ".5em" }}>
        {showAddForm ? (
          <div className="form-container">
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-danger"
              style={{
                alignSelf: "end",
                marginBottom: "3em",
                marginTop: "1em",
              }}
            >
              <FaTimes />
            </button>
            <form className="form-container" onSubmit={handleFormSubmit}>
              <input
                type="text"
                placeholder="enter task..."
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                autoFocus
                maxLength="20"
                required
                style={{ borderRadius: ".5em", padding: ".5em .5em" }}
              />
              <input
                type="date"
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
                required
                style={{ borderRadius: ".5em", padding: ".3em .3em" }}
              />
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        ) : (
          <div id="todos-display" className="container">
            {filteredTodos.map((todo, index) => (
              <div
                key={index}
                className={`container todo-card ${
                  todo.toggled ? "toggled" : ""
                }`}
                onClick={() => toggleTodo(index)}
              >
                <div className="todo-content" style={{ marginLeft: "2em" }}>
                  <div
                    className="circle-toggle"
                    style={{
                      backgroundColor: todo.toggled
                        ? "var(--accent-color)"
                        : "transparent",
                    }}
                  ></div>
                  <p style={{ marginLeft: "2em" }}>{todo.name}</p>
                  <div className="todo-inline">
                    <p style={{ marginLeft: "2em" }}>{todo.date}</p>
                    {todo.toggled && (
                      <button
                        className="btn btn-danger trash-btn"
                        style={{ marginLeft: "auto", marginBottom: ".5em" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteTodo(index);
                        }}
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const useFilteredTodos = (todos, filter) => {
  return useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().slice(0, 10);

    return todos.filter((todo) => {
      const taskDateStr = new Date(todo.date).toISOString().slice(0, 10);
      if (filter === "Today") {
        return taskDateStr === todayStr;
      } else if (filter === "Next 7 Days") {
        const inOneWeek = new Date(today);
        inOneWeek.setDate(today.getDate() + 7);
        const inOneWeekStr = inOneWeek.toISOString().slice(0, 10);
        return taskDateStr >= todayStr && taskDateStr < inOneWeekStr;
      }
      return true;
    });
  }, [todos, filter]);
};

export default MainContent;
