import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom'; // Make sure to import routing components
import Profile from './Profile'; // Import your Profile component


const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard'); // State to track active tab

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <h2>Welcome to the Dashboard</h2>;
            case 'tasks':
                return <h2>Here are your Tasks</h2>;
            case 'profile':
                return <Profile />;
            default:
                return <h2>Welcome to the Dashboard</h2>;
        }
    };

    return (
        <div className="d-flex">
            {/* Sidebar */}
            <nav
                className="d-flex flex-column bg-light border-end vh-100"
                style={{ width: '250px' }}
            >
                <h3 className="p-3">Menu</h3>
                <ul className="nav flex-column">
                    <li
                        className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                        onClick={() => setActiveTab('dashboard')}
                        style={{ cursor: 'pointer' }}
                    >
                        <span className="nav-link">Dashboard</span>
                    </li>
                    <li
                        className={`nav-item ${activeTab === 'tasks' ? 'active' : ''}`}
                        onClick={() => setActiveTab('tasks')}
                        style={{ cursor: 'pointer' }}
                    >
                        <span className="nav-link">Tasks</span>
                    </li>
                    <li
                        className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                        style={{ cursor: 'pointer' }}
                    >
                        <span className="nav-link">Profile</span>
                    </li>
                </ul>
            </nav>

            {/* Main Content Area */}
            <div className="flex-grow-1 p-4">
                {renderContent()}
            </div>
        </div>
    );
};

export default Dashboard;
