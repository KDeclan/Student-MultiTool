import React, { useEffect, useState } from 'react';
import './MainContent.css';

const MainContent = ({ todos, addTodo, editTodo, deleteTodo }) => {
    const [timeOfDay, setTimeofDay] = useState('Greetings 😆');

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
                <div id='todos-display'>
                    <div className='container todo-card' style={{ backgroundColor: '#cfcfcf' }}>
                        <p>Task</p>
                        <div className="date-time-row">
                            <p>Date</p>
                            <p>Time</p>
                        </div>
                        <div className='todo-btns' style={{ alignSelf: 'flex-end' }}>
                            <button className='btn btn-primary'>Edit</button>
                            <button className='btn btn-danger'>Delete</button>
                        </div>
                    </div>
                    <div className='container todo-card' style={{ backgroundColor: '#cfcfcf' }}>
                        <p>Task</p>
                        <div className="date-time-row">
                            <p>Date</p>
                            <p>Time</p>
                        </div>
                        <div className='todo-btns' style={{ alignSelf: 'flex-end' }}>
                            <button className='btn btn-primary'>Edit</button>
                            <button className='btn btn-danger'>Delete</button>
                        </div>
                    </div>
                    <div className='container todo-card' style={{ backgroundColor: '#cfcfcf' }}>
                        <p>Task</p>
                        <div className="date-time-row">
                            <p>Date</p>
                            <p>Time</p>
                        </div>
                        <div className='todo-btns' style={{ alignSelf: 'flex-end' }}>
                            <button className='btn btn-primary'>Edit</button>
                            <button className='btn btn-danger'>Delete</button>
                        </div>
                    </div>
                    <div className='container todo-card' style={{ backgroundColor: '#cfcfcf' }}>
                        <p>Task</p>
                        <div className="date-time-row">
                            <p>Date</p>
                            <p>Time</p>
                        </div>
                        <div className='todo-btns' style={{ alignSelf: 'flex-end' }}>
                            <button className='btn btn-primary'>Edit</button>
                            <button className='btn btn-danger'>Delete</button>
                        </div>
                    </div>
                    <div className='container todo-card' style={{ backgroundColor: '#cfcfcf' }}>
                        <p>Task</p>
                        <div className="date-time-row">
                            <p>Date</p>
                            <p>Time</p>
                        </div>
                        <div className='todo-btns' style={{ alignSelf: 'flex-end' }}>
                            <button className='btn btn-primary'>Edit</button>
                            <button className='btn btn-danger'>Delete</button>
                        </div>
                    </div>
                    <div className='container todo-card' style={{ backgroundColor: '#cfcfcf' }}>
                        <p>Task</p>
                        <div className="date-time-row">
                            <p>Date</p>
                            <p>Time</p>
                        </div>
                        <div className='todo-btns' style={{ alignSelf: 'flex-end' }}>
                            <button className='btn btn-primary'>Edit</button>
                            <button className='btn btn-danger'>Delete</button>
                        </div>
                    </div>
                    <div className='container todo-card' style={{ backgroundColor: '#cfcfcf' }}>
                        <p>Task</p>
                        <div className="date-time-row">
                            <p>Date</p>
                            <p>Time</p>
                        </div>
                        <div className='todo-btns' style={{ alignSelf: 'flex-end' }}>
                            <button className='btn btn-primary'>Edit</button>
                            <button className='btn btn-danger'>Delete</button>
                        </div>
                    </div>
                    <div className='container todo-card' style={{ backgroundColor: '#cfcfcf' }}>
                        <p>Task</p>
                        <div className="date-time-row">
                            <p>Date</p>
                            <p>Time</p>
                        </div>
                        <div className='todo-btns' style={{ alignSelf: 'flex-end' }}>
                            <button className='btn btn-primary'>Edit</button>
                            <button className='btn btn-danger'>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainContent;