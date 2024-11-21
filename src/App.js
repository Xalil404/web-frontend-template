// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
//import Login from './components/auth/Login';
//import Register from './components/auth/Register';
//import Dashboard from './components/Dashboard';
//import Logout from './components/auth/Logout'; // Import the Logout component
//import NotFound from './components/NotFound';
//import Contact from './components/Contact'; // Adjust the path if needed


const App = () => {
    return (
        <Router>
            <Navbar /> {/* Add the Navbar here */}
            <Routes>
                <Route path="/" element={<Home />} />
                
            </Routes>
        </Router>
    );
};

export default App;
