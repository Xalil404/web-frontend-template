import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for redirection

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [username, setUsername] = useState('John Doe'); // Replace with the actual username from the logged-in user
    const navigate = useNavigate(); // Use useNavigate hook for redirection

    // Function to handle logout
    const handleLogout = () => {
        // Logic to log out the user (e.g., clear authentication tokens, etc.)
        // After logging out, redirect to the logout confirmation page
        navigate('/logout'); // Use navigate to redirect to the logout confirmation page
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <h2>Welcome to the Dashboard</h2>;
            case 'tasks':
                return <h2>Here are your Tasks</h2>;
            case 'profile':
                return <h2>Here is your Profile</h2>;
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

                {/* User info and logout section */}
                <div className="user-info mt-4 p-3">
                    <h5>Welcome, {username}</h5>
                    <button 
                        className="btn btn-danger w-100" 
                        onClick={handleLogout}
                    >
                        Log Out
                    </button>
                </div>
            </nav>

            {/* Main Content Area */}
            <div className="flex-grow-1 p-4">
                {renderContent()}
            </div>
        </div>
    );
};

export default Dashboard;
