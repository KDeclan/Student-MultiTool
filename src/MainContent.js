import React, { useEffect, useState } from 'react';
import { FaTimes, FaTrash } from 'react-icons/fa';
import './MainContent.css';

const MainContent = ({ showAddForm, setShowAddForm }) => {
    const [timeOfDay, setTimeofDay] = useState('Greetings 😆');
    const [taskName, setTaskName] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const newTodo = {
            name: taskName,
            date: taskDate,
            toggled: false
        };
        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        setTaskName('');
        setTaskDate('');
        setShowAddForm(false);
    };

    const toggleTodo = (index) => {
        const newTodos = todos.map((todo, idx) => {
            if (idx === index) {

                return { ...todo, toggled: !todo.toggled };
            }
            return {...todo, toggled: false};
        });
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    const deleteTodo = (index) => {
        const updatedTodos = todos.filter((_, idx) => idx !== index);
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    const handleCancel = () => {
        setShowAddForm(false);
    };

    const isDayOrNight = () => {
        const now = new Date();
        const hour = now.getHours();

        if (hour >= 6 && hour < 18) {
            return "Good Morning 🌞";
        } else {
            return "Good Night 💤💤";
        }
    };

    useEffect (() => {
        setTimeofDay(isDayOrNight());
    }, []);

    return (
        <div className='d-flex flex-column vh-100'>
            <div id='main-heading' style={{ alignSelf: 'center' }}>
                <h1 style={{ fontSize: '3rem' }}>{timeOfDay}</h1>
                <h2 className='text-center'>Full Schedule</h2>
            </div>
            <div id='main-body' style={{ marginTop: '.5em' }}>
                {showAddForm ? (
                    <div className="form-container">
                        <button type="button" onClick={handleCancel} className="btn btn-danger" style={{ alignSelf: 'end', marginBottom: '3em', marginTop: '1em' }}>
                <FaTimes /></button>
                        <form className="form-container" onSubmit={handleFormSubmit}>
                        <input
                            type="text"
                            placeholder="enter task..."
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            autoFocus
                            maxLength='20'
                            required
                            style={{ borderRadius: '.5em', padding: '.5em .5em' }}
                        />
                        <input
                                type="date"
                                value={taskDate}
                                onChange={(e) => setTaskDate(e.target.value)}
                                required
                                style={{ borderRadius: '.5em', padding: '.3em .3em' }}
                            />
                        <button type="submit" className='btn btn-primary'>Submit</button>
                    </form>
                  </div>
                ) : (
                    <div id='todos-display'>
                        {todos.map((todo, index) => (
                            <div key={index} className={`container todo-card ${todo.toggled ? 'toggled' : ''}`} onClick={() => toggleTodo(index)}>
                                <div className="todo-content" style={{ marginLeft: '2em' }}>
                                    <div className='circle-toggle' style={{ backgroundColor: todo.toggled ? 'var(--lm-accent-color)' : 'transparent' }}></div>
                                    <p style={{ marginLeft: '2em' }}>{todo.name}</p>
                                    <div className='todo-inline'>
                                        <p style={{ marginLeft: '2em' }}>{todo.date}</p>
                                        {todo.toggled && (
                                        <button className="btn btn-danger trash-btn" style={{ marginLeft: 'auto', marginBottom: '.5em' }} onClick={(e) => { e.stopPropagation(); deleteTodo(index); }}>
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

export default MainContent;